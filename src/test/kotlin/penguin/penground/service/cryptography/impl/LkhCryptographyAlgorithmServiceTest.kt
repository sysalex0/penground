package penguin.penground.service.cryptography.impl

import penguin.penground.cryptography.service.impl.LkhCryptographyAlgorithmService
import kotlin.test.Test
import kotlin.test.assertEquals

class LkhCryptographyAlgorithmServiceTest {
    private val lkhCryptographyAlgorithmAction = LkhCryptographyAlgorithmService()

    @Test
    fun decrypt() {

        val expectedString = "hihi bye bye"
        val encryptedString = lkhCryptographyAlgorithmAction.encrypt(expectedString)
        val actualString = lkhCryptographyAlgorithmAction.decrypt(encryptedString)
        assertEquals(expectedString, actualString)
    }
}