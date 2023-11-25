package penguin.penground.integration.controller

import base.BaseIntegrationTest
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class PingPongApiControllerTest : BaseIntegrationTest() {
    @Test
    fun `when ping, then pong`() {
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/api/v1/ping")
        )
            .andExpect(status().is2xxSuccessful())
    }
}
