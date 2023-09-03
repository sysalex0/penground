package penguin.penground.service.cryptography.impl

import kotlin.test.Test
import kotlin.test.assertEquals

class LkhCryptographyAlgorithmActionTest {
    private val lkhCryptographyAlgorithmAction = LkhCryptographyAlgorithmAction()

    @Test
    fun decrypt() {

        val expectedString = "hihi bye bye"
        val encryptedString = lkhCryptographyAlgorithmAction.encrypt(expectedString)
        val actualString = lkhCryptographyAlgorithmAction.decrypt(encryptedString)
        assertEquals(expectedString, actualString)
    }
}