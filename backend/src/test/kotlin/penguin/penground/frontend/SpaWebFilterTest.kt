package penguin.penground.frontend

import base.BaseFilterTest
import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.Matchers
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.any
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import penguin.penground.cryptography.controller.CryptographyApiController
import penguin.penground.cryptography.handler.CryptographyApiHandler
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.model.EncryptionRequest
import penguin.penground.model.EncryptionResponse
import penguin.penground.`ping-pong`.controller.PingPongApiController

class SpaWebFilterTest : BaseFilterTest() {
    private val mockMvc = getMockMvc(PingPongApiController(), SpaWebFilter())

    @Test
    fun `Given request a backend api, when filter by SpaWebFilter, then return 200`() {
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/api/v1/ping")
        )
            .andExpect(status().is2xxSuccessful())
            .andExpect(forwardedUrl(null))
    }

    @Test
    fun `Given request a un-match url, when filter by SpaWebFilter, then handled by frontend`() {
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/un-match")

        )
            .andExpect(forwardedUrl("/"))
    }
}

@ExtendWith(MockitoExtension::class)
class SpaWebFilterTestOnControllerWithDependencies : BaseFilterTest() {
    @InjectMocks
    lateinit var cryptographyApiController: CryptographyApiController

    @Mock
    lateinit var cryptographyApiHandler: CryptographyApiHandler

    private lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setup() {
        mockMvc = getMockMvc(cryptographyApiController, SpaWebFilter())
    }

    @Test
    fun `Given request a backend api, when filter by SpaWebFilter, then return 200`() {
        val request = EncryptionRequest("testing", CryptographyAlgorithm.lKH)
        val response = EncryptionResponse("sdfdsf")
        `when`(cryptographyApiHandler.encrypt(any())).thenReturn(response)

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/api/v1/cryptography/encrypt")
                .content(ObjectMapper().writeValueAsBytes(request))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().is2xxSuccessful())
            .andExpect(MockMvcResultMatchers.jsonPath("$.payload").isNotEmpty)
            .andExpect(MockMvcResultMatchers.jsonPath("$.payload").value(Matchers.not(request.payload)))
            .andExpect(forwardedUrl(null))
    }
}
