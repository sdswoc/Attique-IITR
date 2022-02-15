-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: attique
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acadinformation`
--

DROP TABLE IF EXISTS `acadinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acadinformation` (
  `enrollment_number` int DEFAULT NULL,
  `time_stamp` varchar(255) DEFAULT NULL,
  `upvotes` int DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acadinformation`
--

LOCK TABLES `acadinformation` WRITE;
/*!40000 ALTER TABLE `acadinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `acadinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Chemical Engineering'),(2,'Civil Engineering'),(3,'Computer Science and Engineering'),(4,'Electrical Engineering'),(5,'Electronics and Communication Engineering'),(6,'Engineering Physics'),(7,'Mechanical Engineering'),(8,'Mathematics & Computing');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) DEFAULT NULL,
  `master_key` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `council` int DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (1,'PAG',NULL,NULL,1),(2,'SDSLabs',NULL,NULL,1),(3,'Finance Club',NULL,NULL,1),(4,'MDG',NULL,NULL,1),(5,'IIT RMS',NULL,NULL,1),(6,'DSG',NULL,NULL,1),(7,'IMG',NULL,NULL,1),(8,'Infosec',NULL,NULL,1),(9,'KNOx',NULL,NULL,1),(10,'PaAc',NULL,NULL,1),(11,'Enactus',NULL,NULL,1),(12,'Share',NULL,NULL,1),(13,'AriES',NULL,NULL,1),(14,'MaRS',NULL,NULL,1),(15,'SAE IIT Roorkee',NULL,NULL,1),(16,'Tinkering Lab',NULL,NULL,1),(17,'E-Cell',NULL,NULL,1),(18,'VLG',NULL,NULL,1),(19,'Robocon',NULL,NULL,1),(20,'iGem',NULL,NULL,1),(21,'Design Studio',NULL,NULL,1),(22,'ASME',NULL,NULL,1),(23,'QCG',NULL,NULL,1),(24,'ACM',NULL,NULL,1),(25,'BlocSoc',NULL,NULL,1),(26,'Fine Arts',NULL,NULL,0),(27,'OnREC',NULL,NULL,0),(28,'Music Section',NULL,NULL,0),(29,'Audio Section',NULL,NULL,0),(30,'Lights Section',NULL,NULL,0),(31,'Cinema Club',NULL,NULL,0),(32,'Spic Macay',NULL,NULL,0),(33,'Cinematic Section',NULL,NULL,0),(34,'Quizzing Section',NULL,NULL,0),(35,'Dramatics Section',NULL,NULL,0),(36,'Stand Up Club',NULL,NULL,0),(37,'Debating Society',NULL,NULL,0),(38,'IRMUN',NULL,NULL,0),(39,'Choreography Section',NULL,NULL,0),(40,'Culinary Club',NULL,NULL,0),(41,'Photography Section',NULL,NULL,0),(42,'Kshitij',NULL,NULL,0);
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubinformation`
--

DROP TABLE IF EXISTS `clubinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubinformation` (
  `club_id` int NOT NULL,
  `time_stamp` varchar(255) DEFAULT NULL,
  `upvotes` int DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubinformation`
--

LOCK TABLES `clubinformation` WRITE;
/*!40000 ALTER TABLE `clubinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `clubinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role` char(250) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'CR'),(2,'BR'),(3,'Student');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `enrollment_number` int NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `second_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `study_year` int DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  `sub_branch_id` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`enrollment_number`),
  KEY `branch_id` (`branch_id`),
  KEY `sub_branch_id` (`sub_branch_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`sub_branch_id`) REFERENCES `sub_branch` (`sub_branch_id`) ON DELETE SET NULL,
  CONSTRAINT `students_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_branch`
--

DROP TABLE IF EXISTS `sub_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_branch` (
  `sub_branch_id` varchar(255) NOT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`sub_branch_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `sub_branch_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_branch`
--

LOCK TABLES `sub_branch` WRITE;
/*!40000 ALTER TABLE `sub_branch` DISABLE KEYS */;
INSERT INTO `sub_branch` VALUES ('N1',1),('N2',1),('N3',1),('Q1',7),('Q2',7),('Q3',7);
/*!40000 ALTER TABLE `sub_branch` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-16  0:38:43
