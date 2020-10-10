name := """Buukmi"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.13.3"

libraryDependencies ++= Seq(guice, evolutions, javaJdbc)
libraryDependencies += "org.postgresql" % "postgresql" % "42.2.12"
// https://mvnrepository.com/artifact/org.apache.commons/commons-lang3
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.11"
libraryDependencies += "com.auth0" % "java-jwt" % "3.10.3"
libraryDependencies += "org.projectlombok" % "lombok" % "1.18.2"
