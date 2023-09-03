package penguin.penground.api

import org.springframework.stereotype.Service
import penguin.penground.factory.CryptographyAlgorithmFactory
import penguin.penground.model.DecryptionRequest
import penguin.penground.model.DecryptionResponse
import penguin.penground.model.EncryptionRequest
import penguin.penground.model.EncryptionResponse

@Service
class CryptographyApiHandler(
    val cryptographyAlgorithmFactory: CryptographyAlgorithmFactory
) {
    fun encrypt(request: EncryptionRequest): EncryptionResponse {
        val cryptographyAlgorithmAction = cryptographyAlgorithmFactory.getCryptographyAlgorithm(request.algorithm)
        val encryptedPayload = cryptographyAlgorithmAction.encrypt(request.payload)
        return EncryptionResponse(encryptedPayload)
    }

    fun decrypt(request: DecryptionRequest): DecryptionResponse {
        val cryptographyAlgorithmAction = cryptographyAlgorithmFactory.getCryptographyAlgorithm(request.algorithm)
        val decryptedPayload = cryptographyAlgorithmAction.decrypt(request.payload)
        return DecryptionResponse(decryptedPayload)
    }
}