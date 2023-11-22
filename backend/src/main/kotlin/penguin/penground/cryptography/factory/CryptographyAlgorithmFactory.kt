package penguin.penground.cryptography.factory

import org.springframework.stereotype.Component
import penguin.penground.cryptography.service.CryptographyAlgorithmService
import penguin.penground.model.CryptographyAlgorithm

@Component
class CryptographyAlgorithmFactory(
    cryptographyAlgorithmServices: List<CryptographyAlgorithmService>
) {
    val cryptographyAlgorithmServiceMap: Map<CryptographyAlgorithm, CryptographyAlgorithmService> =
        cryptographyAlgorithmServices.associateBy { it.algorithm }

    fun getCryptographyAlgorithm(algorithm: CryptographyAlgorithm): CryptographyAlgorithmService {
        return cryptographyAlgorithmServiceMap[algorithm]
            ?: throw RuntimeException("Unsupported algorithm")
    }
}
