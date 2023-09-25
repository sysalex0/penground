package penguin.penground.cryptography.factory

import org.springframework.stereotype.Component
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.cryptography.service.CryptographyAlgorithmService

@Component
class CryptographyAlgorithmFactory(
    val cryptographyAlgorithmServiceMap: Map<CryptographyAlgorithm, CryptographyAlgorithmService>
) {
    fun getCryptographyAlgorithm(algorithm: CryptographyAlgorithm): CryptographyAlgorithmService {
        return cryptographyAlgorithmServiceMap[algorithm]
            ?: throw RuntimeException("Unsupported algorithm")
    }
}