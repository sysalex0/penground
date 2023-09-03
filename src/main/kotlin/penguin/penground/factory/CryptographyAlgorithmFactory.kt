package penguin.penground.factory

import org.springframework.stereotype.Component
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.service.cryptography.CryptographyAlgorithmAction

@Component
class CryptographyAlgorithmFactory(
    val cryptographyAlgorithmActionMap: Map<CryptographyAlgorithm, CryptographyAlgorithmAction>
) {
    fun getCryptographyAlgorithm(algorithm: CryptographyAlgorithm): CryptographyAlgorithmAction {
        return cryptographyAlgorithmActionMap[algorithm]
            ?: throw RuntimeException("Unsupported algorithm")
    }
}