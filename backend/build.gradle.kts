import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.1.0"
	id("io.spring.dependency-management") version "1.1.2"
	id ("org.openapi.generator") version "6.6.0"
	kotlin("jvm") version "1.8.22"
	kotlin("plugin.spring") version "1.8.22"
	kotlin("plugin.jpa") version "1.8.22"
}

group = "penguin"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// Spring boot
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-validation")

	// frontend
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")

	// Open Api
	implementation("org.springdoc:springdoc-openapi-data-rest:1.6.0")
	implementation("org.springdoc:springdoc-openapi-ui:1.6.0")
	implementation("org.springdoc:springdoc-openapi-kotlin:1.6.0")

	// Database
	runtimeOnly("com.mysql:mysql-connector-j")

	// Test
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation("org.jetbrains.kotlin:kotlin-test")
	runtimeOnly ("com.h2database:h2")

	// Development
	compileOnly("org.springframework.boot:spring-boot-devtools")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

openApiGenerate {
	generatorName.set("kotlin-spring")
	inputSpec.set("$rootDir/backend/src/main/resources/openapi/api_description.yaml")
	outputDir.set("$buildDir/generated")
	apiPackage.set("$group.penground.api")
	invokerPackage.set("$group.penground.invoker")
	modelPackage.set("$group.penground.model")
	cleanupOutput.set(true)
	configOptions.set(
		mapOf(
			"dateLibrary" to "java8",
			"interfaceOnly" to "true",
			"useTags" to "true",
			"useSpringBoot3" to "true"
		)
	)
}

openApiValidate {
	inputSpec.set("$rootDir/backend/src/main/resources/api_description.yaml")
	recommend.set(true)
}

tasks.withType<KotlinCompile>().configureEach {
	dependsOn("openApiGenerate")
}

configure<SourceSetContainer> {
	named("main") {
		java.srcDir("$buildDir/generated/src/main/kotlin")
	}
}

if (project.hasProperty("prod")) {
	tasks.withType<Jar> {
		dependsOn(":frontend:yarn_build")

		from("../frontend/build") {
			into("static")
		}
	}
}