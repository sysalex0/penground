package penguin.penground.cryptography.service.impl

import org.springframework.stereotype.Service
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.cryptography.service.CryptographyAlgorithmService

@Service
class SysCryptographyAlgorithmService : CryptographyAlgorithmService {
    override val algorithm: CryptographyAlgorithm
        get() = CryptographyAlgorithm.sYS

    override fun encrypt(payload: String): String {
        TODO("Not yet implemented")
    }

    override fun decrypt(payload: String): String {
        TODO("Not yet implemented")
    }
}