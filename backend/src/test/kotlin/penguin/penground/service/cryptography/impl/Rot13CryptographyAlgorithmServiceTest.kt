package penguin.penground.service.cryptography.impl

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import penguin.penground.cryptography.service.impl.Rot13CryptographyAlgorithmService

class Rot13CryptographyAlgorithmServiceTest {

    private val service = Rot13CryptographyAlgorithmService()

    @Test
    fun `test rot13 encryption`() {
        val plaintext = "Hello, World!"
        val expectedCiphertext = "Uryyb, Jbeyq!"
        assertEquals(expectedCiphertext, service.encrypt(plaintext))
    }

    @Test
    fun `test rot13 decryption`() {
        val ciphertext = "Uryyb, Jbeyq!"
        val expectedPlaintext = "Hello, World!"
        assertEquals(expectedPlaintext, service.decrypt(ciphertext))
    }

    @Test
    fun `test rot13 with numbers and symbols`() {
        val plaintext = "123!@#"
        assertEquals(plaintext, service.encrypt(plaintext))
    }

    @Test
    fun `test rot13 with mixed case`() {
        val plaintext = "AbCdEfG"
        val expectedCiphertext = "NoPqRsT"
        assertEquals(expectedCiphertext, service.encrypt(plaintext))
    }
}
