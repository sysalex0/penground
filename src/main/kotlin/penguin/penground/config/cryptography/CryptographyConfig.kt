package penguin.penground.config.cryptography

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import penguin.penground.model.CryptographyAlgorithm
import penguin.penground.service.cryptography.CryptographyAlgorithmAction

@Configuration
class CryptographyConfig(
    private val cryptographyAlgorithmActions: List<CryptographyAlgorithmAction>
) {
    @Bean
    fun cryptographyAlgorithmActionMap(): Map<CryptographyAlgorithm, CryptographyAlgorithmAction> {
        return cryptographyAlgorithmActions.associateBy { it.algorithm() }
    }
}