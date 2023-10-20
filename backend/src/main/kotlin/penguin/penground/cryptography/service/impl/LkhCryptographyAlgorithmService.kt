package penguin.penground.cryptography.service.impl

import org.springframework.stereotype.Service
import penguin.penground.cryptography.service.CryptographyAlgorithmService
import penguin.penground.model.CryptographyAlgorithm
import java.util.*
import kotlin.random.Random

@Service
class LkhCryptographyAlgorithmService : CryptographyAlgorithmService {
    companion object {
        private const val END_OF_PAYLOAD = "JKC01**"
        private const val MAX_NUM_OF_ITERATION = 10
    }

    override val algorithm: CryptographyAlgorithm
        get() = CryptographyAlgorithm.lKH

    override fun encrypt(payload: String): String {
        var encryptedPayload = payload + END_OF_PAYLOAD

        val randomNumber = Random(System.currentTimeMillis()).nextInt(1, MAX_NUM_OF_ITERATION)
        repeat(randomNumber) {
            encryptedPayload = Base64.getEncoder().encodeToString(encryptedPayload.toByteArray())
        }
        return encryptedPayload
    }

    override fun decrypt(payload: String): String {
        var decryptedPayload = payload
        repeat(MAX_NUM_OF_ITERATION) {
            decryptedPayload = String(Base64.getDecoder().decode(decryptedPayload))
            if (decryptedPayload.endsWith(END_OF_PAYLOAD)) {
                return decryptedPayload.substring(
                    0,
                    decryptedPayload.length - END_OF_PAYLOAD.length
                )
            }
        }
        throw Exception("The payload is not encrypted by $algorithm algorithm")
    }
}
