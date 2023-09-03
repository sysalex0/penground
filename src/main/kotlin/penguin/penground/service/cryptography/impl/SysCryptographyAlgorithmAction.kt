package penguin.penground.service.cryptography.impl

import org.springframework.stereotype.Service
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.service.cryptography.CryptographyAlgorithmAction

@Service
class SysCryptographyAlgorithmAction : CryptographyAlgorithmAction {
    override val algorithm: CryptographyAlgorithm
        get() = CryptographyAlgorithm.sYS

    override fun encrypt(payload: String): String {
        return "SYS encrypt"
    }

    override fun decrypt(payload: String): String {
        TODO("Not yet implemented")
    }
}