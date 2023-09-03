package penguin.penground.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import penguin.penground.api.CryptographyApi
import penguin.penground.api.CryptographyApiHandler
import penguin.penground.model.EncryptionRequest
import penguin.penground.model.EncryptionResponse

@RestController
class CryptographyApiController(
    val cryptographyApiHandler: CryptographyApiHandler
) : CryptographyApi {
    override fun encrypt(encryptionRequest: EncryptionRequest): ResponseEntity<EncryptionResponse> {
        val response = cryptographyApiHandler.encrypt(encryptionRequest)
        return ResponseEntity.ok(response)
    }
}