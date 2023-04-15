-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 13, 2023 at 05:03 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Hospital_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `absence`
--

CREATE TABLE `absence` (
  `leave_id` int(255) NOT NULL,
  `d_id` int(255) NOT NULL,
  `starttime` varchar(255) NOT NULL,
  `endtime` varchar(255) NOT NULL,
  `form` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `absence`
--

INSERT INTO `absence` (`leave_id`, `d_id`, `starttime`, `endtime`, `form`) VALUES
(5, 230, '01/04/2023', '25/04/2023', 'filled');

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `a_id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `ph_no` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`a_id`, `username`, `email`, `password`, `f_name`, `l_name`, `address`, `ph_no`) VALUES
(1002, 'jsb', 'alokiksingh2@gmail.com', '123', 'g', 'f', 'f', 55885),
(1004, 'zihad', 'h@gmail.com', '123', 'hh', 'hh', '7', 78888);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `a_id` int(10) NOT NULL,
  `p_id` int(255) NOT NULL,
  `p_name` varchar(255) NOT NULL,
  `d_name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`a_id`, `p_id`, `p_name`, `d_name`, `date`, `time`) VALUES
(14, 2, ' Jaskaran', 'Sukhansh', '11/04/2023', '1:30 PM'),
(31, 18, 'Alokik', 'Sukhdeep', '28/03/2023', '8:34 PM');

-- --------------------------------------------------------

--
-- Table structure for table `Casedoctor`
--

CREATE TABLE `Casedoctor` (
  `case_id` int(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `d_id` int(255) NOT NULL,
  `info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Casedoctor`
--

INSERT INTO `Casedoctor` (`case_id`, `date`, `time`, `d_id`, `info`) VALUES
(2002, '29/03/2023', '4:01 AM', 230, 'It is done');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `d_id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`d_id`, `username`, `password`, `first_name`, `last_name`, `email`, `address`, `phone`) VALUES
(229, 'user1', '123', 'Sukhansh', 'Nagi', 'b@b.com', 'gt', '567'),
(230, 'user2', '123', 'Sukhdeep', 'Arora', 'sukh@gmail.com', '12st', '58655');

-- --------------------------------------------------------

--
-- Table structure for table `lab tests`
--

CREATE TABLE `lab tests` (
  `test_id` int(255) NOT NULL,
  `record_id` int(255) NOT NULL,
  `type_of_tests` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lab tests`
--

INSERT INTO `lab tests` (`test_id`, `record_id`, `type_of_tests`) VALUES
(190, 1111, 'Ultrasound');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cost` int(255) NOT NULL,
  `a_id` int(255) NOT NULL,
  `op_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `name`, `cost`, `a_id`, `op_id`) VALUES
(1, 'Scalpel', 100, 2, 3),
(3, 'Bandage', 23, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `op_id` int(255) NOT NULL,
  `op_name` varchar(255) NOT NULL,
  `cost` bigint(20) NOT NULL,
  `p_id` int(255) NOT NULL,
  `d_id` int(255) NOT NULL,
  `materials_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`op_id`, `op_name`, `cost`, `p_id`, `d_id`, `materials_id`) VALUES
(3, 'Select', 200, 2, 229, 3),
(8, 'Leg', 3, 18, 230, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `P_userid` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `ph_no` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`P_userid`, `username`, `password`, `f_name`, `l_name`, `email`, `address`, `ph_no`) VALUES
(2, 'jaskaran', '123', 'Jaskaran', 'Singh', 'snghi@gmail.com', '223 Spring City', 877344322),
(18, 'abc', 'abc', 'Aaron', 'Williams', 'will@ucalgary.ca', '12 st', 452309123);

-- --------------------------------------------------------

--
-- Table structure for table `patient has medical record`
--

CREATE TABLE `patient has medical record` (
  `record_id` int(255) NOT NULL,
  `p_id` int(255) NOT NULL,
  `date_time` varchar(255) NOT NULL,
  `a_id` int(255) NOT NULL,
  `case_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient has medical record`
--

INSERT INTO `patient has medical record` (`record_id`, `p_id`, `date_time`, `a_id`, `case_id`) VALUES
(1111, 18, 'any', 1002, 2002);

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `salary_id` int(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `d_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`salary_id`, `amount`, `d_id`) VALUES
(1003, '1234', 229),
(1004, '1011010', 230);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absence`
--
ALTER TABLE `absence`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `d_id` (`d_id`);

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`a_id`,`date`,`time`),
  ADD KEY `pid` (`p_id`);

--
-- Indexes for table `Casedoctor`
--
ALTER TABLE `Casedoctor`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `d_id` (`d_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `lab tests`
--
ALTER TABLE `lab tests`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `lab tests_ibfk_1` (`record_id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `op_id` (`op_id`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`op_id`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `d_id` (`d_id`),
  ADD KEY `materials_id` (`materials_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`P_userid`);

--
-- Indexes for table `patient has medical record`
--
ALTER TABLE `patient has medical record`
  ADD PRIMARY KEY (`record_id`,`p_id`),
  ADD KEY `a_id` (`a_id`),
  ADD KEY `patient has medical record_ibfk_1` (`p_id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`salary_id`),
  ADD KEY `d_id` (`d_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absence`
--
ALTER TABLE `absence`
  MODIFY `leave_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `a_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1009;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `a_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `Casedoctor`
--
ALTER TABLE `Casedoctor`
  MODIFY `case_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2009;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `d_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT for table `lab tests`
--
ALTER TABLE `lab tests`
  MODIFY `test_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `operation`
--
ALTER TABLE `operation`
  MODIFY `op_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `P_userid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `patient has medical record`
--
ALTER TABLE `patient has medical record`
  MODIFY `record_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1119;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `salary_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1007;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `doctor` (`d_id`);

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `pid` FOREIGN KEY (`p_id`) REFERENCES `patient` (`P_userid`);

--
-- Constraints for table `Casedoctor`
--
ALTER TABLE `Casedoctor`
  ADD CONSTRAINT `casedoctor_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `doctor` (`d_id`);

--
-- Constraints for table `lab tests`
--
ALTER TABLE `lab tests`
  ADD CONSTRAINT `lab tests_ibfk_1` FOREIGN KEY (`record_id`) REFERENCES `patient has medical record` (`record_id`);

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`op_id`) REFERENCES `operation` (`op_id`);

--
-- Constraints for table `operation`
--
ALTER TABLE `operation`
  ADD CONSTRAINT `operation_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `patient` (`P_userid`),
  ADD CONSTRAINT `operation_ibfk_2` FOREIGN KEY (`d_id`) REFERENCES `doctor` (`d_id`),
  ADD CONSTRAINT `operation_ibfk_3` FOREIGN KEY (`materials_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `patient has medical record`
--
ALTER TABLE `patient has medical record`
  ADD CONSTRAINT `patient has medical record_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `patient` (`P_userid`),
  ADD CONSTRAINT `patient has medical record_ibfk_3` FOREIGN KEY (`a_id`) REFERENCES `administrator` (`a_id`),
  ADD CONSTRAINT `patient has medical record_ibfk_4` FOREIGN KEY (`case_id`) REFERENCES `Casedoctor` (`case_id`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `doctor` (`d_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
