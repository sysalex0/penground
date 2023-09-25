import com.github.gradle.node.npm.proxy.ProxySettings

plugins {
    id("com.github.node-gradle.node") version "7.0.0"
}

node {
    version.set("18.18.0")
    npmVersion.set("")
    yarnVersion.set("")
    npmInstallCommand.set("install")
    distBaseUrl.set("https://nodejs.org/dist")
    download.set(true)
    workDir.set(file("${project.projectDir}/.cache/nodejs"))
    npmWorkDir.set(file("${project.projectDir}/.cache/npm"))
    yarnWorkDir.set(file("${project.projectDir}/.cache/yarn"))
    nodeProjectDir.set(file("${project.projectDir}"))
    nodeProxySettings.set(ProxySettings.SMART)
}

tasks {
    named("yarn_build") {
        dependsOn("yarn_install")
    }

    named("yarn_test") {
        dependsOn("yarn_install")
    }
}