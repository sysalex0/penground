package penguin.penground.repository

import base.BaseJpaTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import penguin.penground.model.SystemVariable
import penguin.penground.model.SystemVariableId

class SystemVariableRepositoryTest : BaseJpaTest() {
    @Autowired
    lateinit var systemVariableRepository: SystemVariableRepository

    @Test
    fun `Given system_variable with match content, when findByVariableContent, then found`() {
        val expected = SystemVariable(SystemVariableId("A", "B"), "C")
        systemVariableRepository.save(expected)

        val actual = systemVariableRepository.findByVariableContent("C")

        Assertions.assertNotNull(actual)
        Assertions.assertEquals(expected.systemVariableId.variableType, actual.systemVariableId.variableType)
        Assertions.assertEquals(expected.systemVariableId.variableCode, actual.systemVariableId.variableCode)
        Assertions.assertEquals(expected.variableContent, actual.variableContent)
    }
}
