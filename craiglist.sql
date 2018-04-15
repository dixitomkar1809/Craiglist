-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2018 at 04:26 AM
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

--
-- Dumping data for table `hiddenservices`
--

INSERT INTO `hiddenservices` (`hiddenServiceId`, `serviceId`, `userId`) VALUES
(2, 2, 2),
(3, 2, 1),
(4, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `serviceId` int(255) NOT NULL,
  `serviceName` varchar(255) NOT NULL,
  `serviceQuantity` int(11) DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `serviceCategoryId` int(255) NOT NULL,
  `serviceDescription` varchar(255) DEFAULT NULL,
  `serviceUserId` int(255) NOT NULL,
  `serviceCity` varchar(20) NOT NULL,
  `serviceState` varchar(20) NOT NULL,
  `serviceCountry` varchar(20) NOT NULL,
  `servicePrice` varchar(15) DEFAULT NULL,
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
(1, 'Sofa Set', 1, 1, 4, '4 Sets of Couch', 1, 'San Jose', 'California', '', '40', 4, '2018-03-30 20:19:10', NULL, NULL, NULL),
(2, 'Computer Table', 2, 1, 4, 'Big Computer table available', 1, 'Lexington', 'Kentucky', 'United States', '20', 3, '2018-03-30 20:22:15', NULL, NULL, NULL),
(3, 'Nurse Needed', 1, 1, 6, 'Need a nurse for a senior patient to take care of the person at home for daily chores', 1, 'Kansas', 'Missouri', 'United States', '15', 5, '2018-03-30 23:29:05', NULL, NULL, NULL),
(4, 'Roomate Needed', NULL, 1, 5, 'Need two roomates for a 2 bhk flat', 1, 'Dallas', 'Texas', 'United States', '250', 4, '2018-03-30 23:29:05', NULL, NULL, NULL);

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
  `serviceImageName` int(255) NOT NULL,
  `serviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `doj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `fullName`, `emailId`, `phoneNo`, `address`, `city`, `state`, `country`, `zipcode`, `password`, `gPlusLogin`, `fbLogin`, `cashTag`, `userRating`, `doj`) VALUES
(1, 'Michele Leband', 'mleband0@hhs.gov', '408-343-27', '6 Waxwing Place', 'San Jose', 'California', NULL, '27352', 'd75876efef762004b5a7812181ca4709', 0, 1, '/dolor/vel.js?congue=tincidunt&diam=ante&id=vel&ornare=ipsum&imperdiet=praesent&sapien=blandit&urna=lacinia&pretium=erat&nisl=vestibulum&ut=sed&volutpat=magna&sapien=at&arcu=nunc&sed=commodo&augue=placerat&aliquam=praesent&erat=blandit&volutpat=nam&in=nul', 2, '0000-00-00 00:00:00'),
(2, 'Dominique Pinck', 'dpinck1@barnesandnoble.com', '859-396-24', '2060 Brentwood Park', 'Lexington', 'Kentucky', NULL, '59859', 'imAuZ9h6B9mk', 1, 0, '/massa/id/nisl/venenatis/lacinia.aspx?rutrum=vitae&nulla=ipsum&tellus=aliquam&in=non&sagittis=mauris&dui=morbi&vel=non', 4, '0000-00-00 00:00:00'),
(3, 'Udell Rickerby', 'urickerby2@cnn.com', '805-678-92', '1052 Fairfield Trail', 'Bakersfield', 'California', NULL, '49955', 'lwxVwsEzn', 1, 1, '/elit.png?interdum=libero&eu=nam&tincidunt=dui&in=proin&leo=leo&maecenas=odio&pulvinar=porttitor&lobortis=id&est=consequat&phasellus=in&sit=consequat&amet=ut&erat=nulla&nulla=sed&tempus=accumsan&vivamus=felis&in=ut&felis=at&eu=dolor&sapien=quis&cursus=odi', 5, '0000-00-00 00:00:00'),
(4, 'Claudius Ridehalgh', 'cridehalgh3@tripadvisor.com', '334-638-23', '739 Talisman Street', 'Montgomery', 'Alabama', NULL, '47997', 'UY2LF4UK9nP', 1, 1, '/duis.png?interdum=morbi&venenatis=sem&turpis=mauris&enim=laoreet&blandit=ut&mi=rhoncus&in=aliquet&porttitor=pulvinar&pede=sed&justo=nisl&eu=nunc&massa=rhoncus&donec=dui&dapibus=vel&duis=sem&at=sed&velit=sagittis&eu=nam&est=congue&congue=risus&elementum=s', 3, '0000-00-00 00:00:00'),
(5, 'Isis Kuhl', 'ikuhl4@xinhuanet.com', '816-526-73', '3447 Forest Run Pass', 'Kansas City', 'Missouri', NULL, '53500', '2yjm6GxfJ1', 1, 1, '/sit.png?cum=tellus&sociis=nulla&natoque=ut&penatibus=erat&et=id&magnis=mauris&dis=vulputate&parturient=elementum&montes=nullam&nascetur=varius&ridiculus=nulla&mus=facilisi&vivamus=cras&vestibulum=non&sagittis=velit&sapien=nec&cum=nisi&sociis=vulputate&na', 5, '0000-00-00 00:00:00'),
(28, 'Tushar Chemburkar', 'thc170830@gmail.com', '8087730009', '7825, Mccallum Blvd, Apt 402', 'Dallas', 'Texas', 'United States', '75252', '35e9388ce176d30442640de29085606d', NULL, NULL, NULL, NULL, '2018-04-13 08:46:53');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlistId` int(11) NOT NULL,
  `wishlistName` varchar(255) NOT NULL,
  `wishlistUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wishlistitems`
--

CREATE TABLE `wishlistitems` (
  `wishlistItemId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `wishlistId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  ADD PRIMARY KEY (`wishlistId`),
  ADD KEY `wishlistUserId` (`wishlistUserId`);

--
-- Indexes for table `wishlistitems`
--
ALTER TABLE `wishlistitems`
  ADD PRIMARY KEY (`wishlistItemId`),
  ADD KEY `wishlistId` (`wishlistId`),
  ADD KEY `serviceId` (`serviceId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hiddenservices`
--
ALTER TABLE `hiddenservices`
  MODIFY `hiddenServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `serviceId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlistId` int(11) NOT NULL AUTO_INCREMENT;

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

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`wishlistUserId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `wishlistitems`
--
ALTER TABLE `wishlistitems`
  ADD CONSTRAINT `wishlistitems_ibfk_1` FOREIGN KEY (`wishlistId`) REFERENCES `wishlist` (`wishlistId`),
  ADD CONSTRAINT `wishlistitems_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `service` (`serviceId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
