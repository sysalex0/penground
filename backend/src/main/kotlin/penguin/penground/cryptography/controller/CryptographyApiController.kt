package penguin.penground.cryptography.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import penguin.penground.api.CryptographyApi
import penguin.penground.cryptography.handler.CryptographyApiHandler
import penguin.penground.model.DecryptionRequest
import penguin.penground.model.DecryptionResponse
import penguin.penground.model.EncryptionRequest
import penguin.penground.model.EncryptionResponse

@RestController
class CryptographyApiController(
    val cryptographyApiHandler: CryptographyApiHandler
) : CryptographyApi {
    override fun cryptographyDecryptPost(decryptionRequest: DecryptionRequest): ResponseEntity<DecryptionResponse> {
        val response = cryptographyApiHandler.decrypt(decryptionRequest)
        return ResponseEntity.ok(response)
    }

    override fun cryptographyEncryptPost(encryptionRequest: EncryptionRequest): ResponseEntity<EncryptionResponse> {
        val response = cryptographyApiHandler.encrypt(encryptionRequest)
        return ResponseEntity.ok(response)
    }
}