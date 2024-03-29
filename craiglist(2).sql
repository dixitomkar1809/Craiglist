-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2018 at 10:09 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `craiglist`
--

-- --------------------------------------------------------

--
-- Table structure for table `hiddenservices`
--

CREATE TABLE `hiddenservices` (
  `hiddenServiceId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `serviceId` int(255) NOT NULL,
  `serviceName` varchar(255) NOT NULL,
  `serviceQuantity` int(11) DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL DEFAULT '1',
  `serviceCategoryId` int(255) NOT NULL,
  `serviceDescription` varchar(255) DEFAULT NULL,
  `serviceUserId` int(255) NOT NULL,
  `serviceCity` varchar(20) NOT NULL,
  `serviceState` varchar(20) NOT NULL,
  `serviceCountry` varchar(20) NOT NULL,
  `servicePrice` varchar(15) NOT NULL,
  `serviceRating` int(5) DEFAULT NULL,
  `serviceDoc` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `serviceDor` timestamp NULL DEFAULT NULL,
  `serviceAttributesId` int(255) DEFAULT NULL,
  `serviceSpamCount` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`serviceId`, `serviceName`, `serviceQuantity`, `isAvailable`, `serviceCategoryId`, `serviceDescription`, `serviceUserId`, `serviceCity`, `serviceState`, `serviceCountry`, `servicePrice`, `serviceRating`, `serviceDoc`, `serviceDor`, `serviceAttributesId`, `serviceSpamCount`) VALUES
(1, 'DSLR Camera D5500', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '500', NULL, '2018-04-26 07:13:47', NULL, NULL, NULL),
(2, 'Books for sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '15', NULL, '2018-04-26 07:15:47', NULL, NULL, NULL),
(3, 'Toyo Tyres', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '100', NULL, '2018-04-26 07:18:00', NULL, NULL, NULL),
(4, 'Laptop For sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '300', NULL, '2018-04-26 07:22:57', NULL, NULL, NULL),
(5, 'SR-71 For sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '30,000,000', NULL, '2018-04-26 07:24:50', NULL, NULL, NULL),
(6, 'B2 Bomber for sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '1,500,000,000', NULL, '2018-04-26 07:26:33', NULL, NULL, NULL),
(7, 'Cars for sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '3000', NULL, '2018-04-26 07:27:35', NULL, NULL, NULL),
(8, 'Furniture for sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '50', NULL, '2018-04-26 07:33:13', NULL, NULL, NULL),
(9, 'Rims for sale', NULL, 1, 4, '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat at orci ut auctor. Mauris arcu massa, blandit nec est quis, pharetra placerat arcu. Quisque rutrum ut odio at bibendum. Orci varius natoque penatibus et magnis dis parturient monte', 1, '', '', '', '100', NULL, '2018-04-26 07:40:29', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `serviceattributes`
--

CREATE TABLE `serviceattributes` (
  `serviceAttributesId` int(255) NOT NULL,
  `serviceAttribute1` int(255) DEFAULT NULL,
  `serviceAttribute2` int(255) DEFAULT NULL,
  `serviceAttribute3` int(255) DEFAULT NULL,
  `serviceAttributes4` int(255) DEFAULT NULL,
  `serviceAttributes5` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `servicecategory`
--

CREATE TABLE `servicecategory` (
  `serviceCategoryId` int(11) NOT NULL,
  `serviceCategoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servicecategory`
--

INSERT INTO `servicecategory` (`serviceCategoryId`, `serviceCategoryName`) VALUES
(1, 'Community'),
(2, 'Services'),
(3, 'Personal'),
(4, 'For Sale'),
(5, 'Housing'),
(6, 'Jobs'),
(7, 'Gigs'),
(8, 'Resume');

-- --------------------------------------------------------

--
-- Table structure for table `serviceimages`
--

CREATE TABLE `serviceimages` (
  `serviceImageId` int(255) NOT NULL,
  `serviceImageName` varchar(255) NOT NULL,
  `serviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `serviceimages`
--

INSERT INTO `serviceimages` (`serviceImageId`, `serviceImageName`, `serviceId`) VALUES
(1, '../CraiglistFrontEnd/src/assets/uploads/1524726827690.jpg', 1),
(2, '../CraiglistFrontEnd/src/assets/uploads/1524726947147.jpg', 2),
(3, '../CraiglistFrontEnd/src/assets/uploads/1524727080181.jpg', 3),
(4, '../CraiglistFrontEnd/src/assets/uploads/1524727377761.jpg', 4),
(5, '../CraiglistFrontEnd/src/assets/uploads/1524727490879.jpg', 5),
(6, '../CraiglistFrontEnd/src/assets/uploads/1524727593158.jpg', 6),
(7, '../CraiglistFrontEnd/src/assets/uploads/1524727655329.jpg', 7),
(8, '../CraiglistFrontEnd/src/assets/uploads/1524727993284.jpg', 8),
(9, '../CraiglistFrontEnd/src/assets/uploads/1524728429860.jpg', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(255) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `emailId` varchar(30) NOT NULL,
  `phoneNo` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zipcode` varchar(6) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gPlusLogin` tinyint(1) DEFAULT NULL,
  `fbLogin` tinyint(1) DEFAULT NULL,
  `cashTag` varchar(255) DEFAULT NULL,
  `userRating` int(11) DEFAULT NULL,
  `doj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `fullName`, `emailId`, `phoneNo`, `address`, `city`, `state`, `country`, `zipcode`, `password`, `gPlusLogin`, `fbLogin`, `cashTag`, `userRating`, `doj`, `isActive`) VALUES
(1, 'Omkar Dixit', 'ond170030@utdallas.edu', NULL, NULL, NULL, NULL, NULL, NULL, '22db7fddd92fb6c337a6443d0c0013c0', NULL, NULL, NULL, NULL, '2018-04-26 06:51:02', 1),
(2, 'Tushar Chemburkar', 'thc170830@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 'de334b63ea86811043b641d891f6bac0', NULL, NULL, NULL, NULL, '2018-04-26 08:06:08', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlistId` int(255) NOT NULL,
  `wishlistServiceId` int(255) NOT NULL,
  `wishlistUserid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`wishlistId`, `wishlistServiceId`, `wishlistUserid`) VALUES
(0, 1, 2),
(0, 9, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hiddenservices`
--
ALTER TABLE `hiddenservices`
  ADD PRIMARY KEY (`hiddenServiceId`),
  ADD KEY `serviceId` (`serviceId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`serviceId`),
  ADD KEY `serviceAttributesId` (`serviceAttributesId`),
  ADD KEY `serviceCategoryId` (`serviceCategoryId`),
  ADD KEY `serviceUserId` (`serviceUserId`);

--
-- Indexes for table `serviceattributes`
--
ALTER TABLE `serviceattributes`
  ADD PRIMARY KEY (`serviceAttributesId`);

--
-- Indexes for table `servicecategory`
--
ALTER TABLE `servicecategory`
  ADD PRIMARY KEY (`serviceCategoryId`);

--
-- Indexes for table `serviceimages`
--
ALTER TABLE `serviceimages`
  ADD PRIMARY KEY (`serviceImageId`),
  ADD KEY `serviceId` (`serviceId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `emailId` (`emailId`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlistServiceId`,`wishlistUserid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hiddenservices`
--
ALTER TABLE `hiddenservices`
  MODIFY `hiddenServiceId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `serviceId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `serviceattributes`
--
ALTER TABLE `serviceattributes`
  MODIFY `serviceAttributesId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servicecategory`
--
ALTER TABLE `servicecategory`
  MODIFY `serviceCategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `serviceimages`
--
ALTER TABLE `serviceimages`
  MODIFY `serviceImageId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hiddenservices`
--
ALTER TABLE `hiddenservices`
  ADD CONSTRAINT `hiddenservices_ibfk_1` FOREIGN KEY (`serviceId`) REFERENCES `service` (`serviceId`),
  ADD CONSTRAINT `hiddenservices_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`serviceAttributesId`) REFERENCES `serviceattributes` (`serviceAttributesId`),
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`serviceCategoryId`) REFERENCES `servicecategory` (`serviceCategoryId`),
  ADD CONSTRAINT `service_ibfk_3` FOREIGN KEY (`serviceUserId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `serviceimages`
--
ALTER TABLE `serviceimages`
  ADD CONSTRAINT `serviceimages_ibfk_1` FOREIGN KEY (`serviceId`) REFERENCES `service` (`serviceId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
