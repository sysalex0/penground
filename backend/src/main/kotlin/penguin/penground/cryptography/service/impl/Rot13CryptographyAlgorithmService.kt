package penguin.penground.cryptography.service.impl

import org.springframework.stereotype.Service
import penguin.penground.cryptography.service.CryptographyAlgorithmService

import penguin.penground.model.CryptographyAlgorithm

@Service
class Rot13CryptographyAlgorithmService : CryptographyAlgorithmService {
    override val algorithm: CryptographyAlgorithm
        get() = CryptographyAlgorithm.rOT13

    override fun encrypt(payload: String): String {
        return rot13(payload)
    }

    override fun decrypt(payload: String): String {
        return rot13(payload)
    }

    private fun rot13(input: String): String {
        return input.map { char ->
            when (char) {
                in 'a'..'z' -> {
                    val shifted = char + 13
                    if (shifted > 'z') shifted - 26 else shifted
                }
                in 'A'..'Z' -> {
                    val shifted = char + 13
                    if (shifted > 'Z') shifted - 26 else shifted
                }
                else -> char
            }
        }.joinToString("")
    }
}
