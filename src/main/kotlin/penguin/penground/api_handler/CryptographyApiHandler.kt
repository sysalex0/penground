package penguin.penground.api_handler

import org.springframework.stereotype.Service
import penguin.penground.model.EncryptionRequest
import penguin.penground.model.EncryptionResponse

@Service
class CryptographyApiHandler {
    fun encrypt(request: EncryptionRequest): EncryptionResponse
    {
        val response = EncryptionResponse("result")
        return response
    }
}