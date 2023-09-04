// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("com.android.application") version "8.1.0" apply false
    id("org.jetbrains.kotlin.android") version "1.8.0" apply false

    // Klint plugin
    id("org.jlleitschuh.gradle.ktlint") version "11.0.0"
}
