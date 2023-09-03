package penguin.penground.service.cryptography.impl

import org.springframework.stereotype.Service
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.service.cryptography.CryptographyAlgorithmAction

@Service
class LkhCryptographyAlgorithmAction : CryptographyAlgorithmAction {
    override fun algorithm(): CryptographyAlgorithm {
        return CryptographyAlgorithm.lKH
    }

    override fun encrypt(payload: String): String {
        return "LKH encrypt"
    }

    override fun decrypt(payload: String): String {
        TODO("Not yet implemented")
    }
}