package penguin.penground.`ping-pong`.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import penguin.penground.api.PingPongApi

@RestController
class PingPongApiController : PingPongApi {
    override fun pingGet(): ResponseEntity<Unit> {
        return ResponseEntity.ok().build()
    }
}
