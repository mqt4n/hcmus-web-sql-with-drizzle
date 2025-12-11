CREATE TABLE `BOMON` (
	`MABM` text(10) PRIMARY KEY NOT NULL,
	`TENBM` text(50),
	`PHONG` text(10),
	`DIENTHOAI` text(10),
	`TRUONGBM` text(10),
	`MAKHOA` text(10),
	`NGAYNHANCHUC` text,
	FOREIGN KEY (`TRUONGBM`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`MAKHOA`) REFERENCES `KHOA`(`MAKHOA`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `CHUDE` (
	`MACD` text(10) PRIMARY KEY NOT NULL,
	`TENCD` text(50)
);
--> statement-breakpoint
CREATE TABLE `CONGVIEC` (
	`MADT` text(10) NOT NULL,
	`SOTT` integer NOT NULL,
	`TENCV` text(50),
	`NGAYBD` text,
	`NGAYKT` text,
	PRIMARY KEY(`MADT`, `SOTT`),
	FOREIGN KEY (`MADT`) REFERENCES `DETAI`(`MADT`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `DETAI` (
	`MADT` text(10) PRIMARY KEY NOT NULL,
	`TENDT` text(50),
	`CAPQL` text(50),
	`KINHPHI` real,
	`NGAYBD` text,
	`NGAYKT` text,
	`MACD` text(10),
	`GVCNDT` text(10),
	FOREIGN KEY (`MACD`) REFERENCES `CHUDE`(`MACD`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`GVCNDT`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `GIAOVIEN` (
	`MAGV` text(10) PRIMARY KEY NOT NULL,
	`HOTEN` text(50) NOT NULL,
	`LUONG` real DEFAULT 1000,
	`PHAI` text(3) NOT NULL,
	`NGSINH` text,
	`DIACHI` text(50),
	`GVQLCM` text(10),
	`MABM` text(10),
	FOREIGN KEY (`GVQLCM`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`MABM`) REFERENCES `BOMON`(`MABM`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "check_phai_giaovien" CHECK("GIAOVIEN"."PHAI" IN ('Nam', 'Nữ'))
);
--> statement-breakpoint
CREATE TABLE `GV_DT` (
	`MAGV` text(10) NOT NULL,
	`DIENTHOAI` text(10) NOT NULL,
	PRIMARY KEY(`MAGV`, `DIENTHOAI`),
	FOREIGN KEY (`MAGV`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `KHOA` (
	`MAKHOA` text(10) PRIMARY KEY NOT NULL,
	`TENKHOA` text(50),
	`NAMTL` integer,
	`PHONG` text(3),
	`DIENTHOAI` text(10),
	`TRUONGKHOA` text(10),
	`NGAYNHANCHUC` text,
	FOREIGN KEY (`TRUONGKHOA`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `NGUOITHAN` (
	`MAGV` text(10) NOT NULL,
	`TEN` text(50) NOT NULL,
	`NGSINH` text,
	`PHAI` text(3) NOT NULL,
	PRIMARY KEY(`MAGV`, `TEN`),
	FOREIGN KEY (`MAGV`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `THAMGIADT` (
	`MAGV` text(10) NOT NULL,
	`MADT` text(10) NOT NULL,
	`STT` integer NOT NULL,
	`PHUCAP` real,
	`KETQUA` text(10),
	PRIMARY KEY(`MAGV`, `MADT`, `STT`),
	FOREIGN KEY (`MAGV`) REFERENCES `GIAOVIEN`(`MAGV`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`MADT`) REFERENCES `DETAI`(`MADT`) ON UPDATE no action ON DELETE cascade
);
