-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecturers` (
    `id` VARCHAR(191) NOT NULL,
    `lecture_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `do_supervision_quota` INTEGER NOT NULL DEFAULT 0,
    `id_education_department` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NULL,

    UNIQUE INDEX `lecturers_lecture_number_key`(`lecture_number`),
    UNIQUE INDEX `lecturers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(191) NOT NULL,
    `student_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `id_education_department` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NULL,

    UNIQUE INDEX `students_student_number_key`(`student_number`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supervisions` (
    `id` VARCHAR(191) NOT NULL,
    `request_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `supervisor_qty` INTEGER NOT NULL DEFAULT 1,
    `id_student` VARCHAR(191) NOT NULL,
    `id_minor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `supervisions_id_student_key`(`id_student`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minor_lecturers` (
    `id` VARCHAR(191) NOT NULL,
    `id_lecturer` VARCHAR(191) NOT NULL,
    `id_minor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `minor_lecturers_id_lecturer_id_minor_key`(`id_lecturer`, `id_minor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supervisors` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `request_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_supervisions` VARCHAR(191) NOT NULL,
    `id_lecturer` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `supervisors_id_supervisions_id_lecturer_key`(`id_supervisions`, `id_lecturer`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education_departments` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `education_departments_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `majors` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id_education_department` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `majors_code_key`(`code`),
    UNIQUE INDEX `majors_id_education_department_key`(`id_education_department`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minors` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id_major` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `minors_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_id_education_department_fkey` FOREIGN KEY (`id_education_department`) REFERENCES `education_departments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_id_education_department_fkey` FOREIGN KEY (`id_education_department`) REFERENCES `education_departments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supervisions` ADD CONSTRAINT `supervisions_id_student_fkey` FOREIGN KEY (`id_student`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supervisions` ADD CONSTRAINT `supervisions_id_minor_fkey` FOREIGN KEY (`id_minor`) REFERENCES `minors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `minor_lecturers` ADD CONSTRAINT `minor_lecturers_id_lecturer_fkey` FOREIGN KEY (`id_lecturer`) REFERENCES `lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `minor_lecturers` ADD CONSTRAINT `minor_lecturers_id_minor_fkey` FOREIGN KEY (`id_minor`) REFERENCES `minors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supervisors` ADD CONSTRAINT `supervisors_id_supervisions_fkey` FOREIGN KEY (`id_supervisions`) REFERENCES `supervisions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supervisors` ADD CONSTRAINT `supervisors_id_lecturer_fkey` FOREIGN KEY (`id_lecturer`) REFERENCES `lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `majors` ADD CONSTRAINT `majors_id_education_department_fkey` FOREIGN KEY (`id_education_department`) REFERENCES `education_departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `minors` ADD CONSTRAINT `minors_id_major_fkey` FOREIGN KEY (`id_major`) REFERENCES `majors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
