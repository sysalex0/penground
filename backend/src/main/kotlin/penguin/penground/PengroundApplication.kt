package penguin.penground

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PengroundApplication

fun main(args: Array<String>) {
    runApplication<PengroundApplication>(*args)
}
