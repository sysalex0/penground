package penguin.penground.cryptography.service

import penguin.penground.model.CryptographyAlgorithm

interface CryptographyAlgorithmService {
    val algorithm: CryptographyAlgorithm
    fun encrypt(payload: String): String

    fun decrypt(payload: String): String
}