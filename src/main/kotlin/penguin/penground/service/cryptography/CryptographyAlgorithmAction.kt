package penguin.penground.service.cryptography

import penguin.penground.model.CryptographyAlgorithm

interface CryptographyAlgorithmAction {
    fun algorithm(): CryptographyAlgorithm
    fun encrypt(payload: String): String

    fun decrypt(payload: String): String
}