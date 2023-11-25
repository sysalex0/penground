package penguin.penground.integration.controller

import base.BaseIntegrationTest
import org.hamcrest.Matchers.not
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.model.DecryptionRequest
import penguin.penground.model.EncryptionRequest

class CryptographyApiControllerTest : BaseIntegrationTest() {
    @Test
    fun `Given a valid encryption request, when invoke cryptographyEncryptPost, then return response with encrypted payload and 200 status code`() {
        val request = EncryptionRequest("testing", CryptographyAlgorithm.lKH)

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/api/v1/cryptography/encrypt")
                .content(objectMapper.writeValueAsBytes(request))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().is2xxSuccessful())
            .andExpect(jsonPath("$.payload").isNotEmpty)
            .andExpect(jsonPath("$.payload").value(not(request.payload)))
    }

    @Test
    fun `Given a valid decryption request, when invoke cryptographyDecryptPost, then return response with decrypted payload and 200 status code`() {
        val request = DecryptionRequest("V2tWa1YyVnRVa2hpU0ZaaFRVaENUVlZZY0VKbFJYUndZbm93UFE9PQ==", CryptographyAlgorithm.lKH)

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/api/v1/cryptography/decrypt")
                .content(objectMapper.writeValueAsBytes(request))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().is2xxSuccessful())
            .andExpect(jsonPath("$.payload").isNotEmpty)
            .andExpect(jsonPath("$.payload").value("testing"))
    }
}
