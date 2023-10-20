package penguin.penground.config.cryptography

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import penguin.penground.cryptography.service.CryptographyAlgorithmService
import penguin.penground.model.CryptographyAlgorithm

@Configuration
class FactoryConfig {
    @Bean
    fun cryptographyAlgorithmActionMap(cryptographyAlgorithmServices: List<CryptographyAlgorithmService>): Map<CryptographyAlgorithm, CryptographyAlgorithmService> {
        return cryptographyAlgorithmServices.associateBy { it.algorithm }
    }
}
