CREATE TABLE `BOMON` (
	`MABM` text(10) PRIMARY KEY NOT NULL,
	`TENBM` text(50),
	`PHONG` text(10),
	`DIENTHOAI` text(10),
	`TRUONGBM` text(10),
	`MAKHOA` text(10),
	`NGAYNHANCHUC` text
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
	PRIMARY KEY(`MADT`, `SOTT`)
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
	`GVCNDT` text(10)
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
	`MABM` text(10)
);
--> statement-breakpoint
CREATE TABLE `GV_DT` (
	`MAGV` text(10) NOT NULL,
	`DIENTHOAI` text(10) NOT NULL,
	PRIMARY KEY(`MAGV`, `DIENTHOAI`)
);
--> statement-breakpoint
CREATE TABLE `KHOA` (
	`MAKHOA` text(10) PRIMARY KEY NOT NULL,
	`TENKHOA` text(50),
	`NAMTL` integer,
	`PHONG` text(3),
	`DIENTHOAI` text(10),
	`TRUONGKHOA` text(10),
	`NGAYNHANCHUC` text
);
--> statement-breakpoint
CREATE TABLE `NGUOITHAN` (
	`MAGV` text(10) NOT NULL,
	`TEN` text(50) NOT NULL,
	`NGSINH` text,
	`PHAI` text(3) NOT NULL,
	PRIMARY KEY(`MAGV`, `TEN`)
);
--> statement-breakpoint
CREATE TABLE `THAMGIADT` (
	`MAGV` text(10) NOT NULL,
	`MADT` text(10) NOT NULL,
	`STT` integer NOT NULL,
	`PHUCAP` real,
	`KETQUA` text(10),
	PRIMARY KEY(`MAGV`, `MADT`, `STT`)
);
