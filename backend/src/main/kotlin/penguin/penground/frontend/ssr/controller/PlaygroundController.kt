package penguin.penground.frontend.ssr.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller("/playground")
class PlaygroundController {
    @GetMapping("/cryptography")
    fun getHomePage(model: Model): String {
        return "cryptography"
    }
}