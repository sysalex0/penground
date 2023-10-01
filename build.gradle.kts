plugins {
    base
    kotlin("jvm") version "1.8.22" apply false
}

allprojects {
    group = "penguin"
    version = "0.0.1-SNAPSHOT"

    repositories {
        mavenLocal()
        mavenCentral()
    }
}
