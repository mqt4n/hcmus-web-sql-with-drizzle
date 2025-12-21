import { db, schema } from '../db';
import { sql, eq } from 'drizzle-orm';

export class RawSQLTransService {
  async getHighEarners(minSalary: number) {
    const teachers = db.all(
      sql`
      SELECT * 
      FROM GIAOVIEN 
      WHERE LUONG > ${minSalary}`
    );
    
    return teachers;
  }

  async getTeachersBornBefore(year: string) {
    const teachers = await db.select()
      .from(schema.giaoVien)
      .where(sql`strftime('%Y', ${schema.giaoVien.ngSinh}) < ${year}`);

    return teachers;
  }

  /**
   * Private helper: Get current state of two teachers
   */
  private async getTeachersState(fromTeacherId: string, toTeacherId: string) {
    const fromTeacher = await db.query.giaoVien.findFirst({ 
      where: eq(schema.giaoVien.magv, fromTeacherId) 
    });
    const toTeacher = await db.query.giaoVien.findFirst({ 
      where: eq(schema.giaoVien.magv, toTeacherId) 
    });

    return {
      from: { id: fromTeacher!.magv, name: fromTeacher!.hoTen, salary: fromTeacher!.luong },
      to: { id: toTeacher!.magv, name: toTeacher!.hoTen, salary: toTeacher!.luong }
    };
  }

  async transferSalary(fromTeacherId: string, toTeacherId: string, amount: number) {
    const fromTeacher = await db.query.giaoVien.findFirst({ 
      where: eq(schema.giaoVien.magv, fromTeacherId) 
    });
    const toTeacher = await db.query.giaoVien.findFirst({ 
      where: eq(schema.giaoVien.magv, toTeacherId) 
    });

    if (!fromTeacher || !toTeacher) {
      throw new Error('One or both teachers not found');
    }

    if (fromTeacher.luong < amount) {
      throw new Error('Insufficient salary to transfer');
    }

    const beforeState = await this.getTeachersState(fromTeacherId, toTeacherId);

    try {
      db.transaction((tx) => {
        tx.update(schema.giaoVien)
          .set({ luong: sql`${schema.giaoVien.luong} - ${amount}` })
          .where(eq(schema.giaoVien.magv, fromTeacherId))
          .run();
        

        tx.update(schema.giaoVien)
          .set({ luong: sql`${schema.giaoVien.luong} + ${amount}` })
          .where(eq(schema.giaoVien.magv, toTeacherId))
          .run(); 
      });
    } catch (error) {
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    const afterState = await this.getTeachersState(fromTeacherId, toTeacherId);

    return {
      success: true,
      amount,
      before: beforeState,
      after: afterState
    };
  }

  async transferSalaryRollbackTest(fromTeacherId: string, toTeacherId: string, amount: number) {
    const fromTeacher = await db.query.giaoVien.findFirst({ 
      where: eq(schema.giaoVien.magv, fromTeacherId) 
    });
    const toTeacher = await db.query.giaoVien.findFirst({ 
      where: eq(schema.giaoVien.magv, toTeacherId) 
    });

    if (!fromTeacher || !toTeacher) {
      throw new Error('One or both teachers not found');
    }

    if (fromTeacher.luong < amount) {
      throw new Error('Insufficient salary to transfer');
    }

    const beforeState = await this.getTeachersState(fromTeacherId, toTeacherId);

    let errorMessage = '';
    
    try {
      db.transaction((tx) => {
        tx.update(schema.giaoVien)
          .set({ luong: sql`${schema.giaoVien.luong} - ${amount}` })
          .where(eq(schema.giaoVien.magv, fromTeacherId))
          .run();
        
        throw new Error("🔥 Simulated Server Crash!");

        tx.update(schema.giaoVien)
          .set({ luong: sql`${schema.giaoVien.luong} + ${amount}` })
          .where(eq(schema.giaoVien.magv, toTeacherId))
          .run(); 
      });
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unknown error';
    }

    const afterState = await this.getTeachersState(fromTeacherId, toTeacherId);

    return {
      success: false,
      transactionRolledBack: true,
      error: errorMessage,
      amount,
      before: beforeState,
      after: afterState,
      message: 'Transaction failed and rolled back. Data remains unchanged.'
    };
  } 
}



export const rawSQLTransService = new RawSQLTransService();
