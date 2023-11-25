package penguin.penground.repository

import org.springframework.data.jpa.repository.JpaRepository
import penguin.penground.model.SystemVariable
import penguin.penground.model.SystemVariableId

interface SystemVariableRepository : JpaRepository<SystemVariable, SystemVariableId> {
    fun findByVariableContent(variableContent: String): SystemVariable
}
