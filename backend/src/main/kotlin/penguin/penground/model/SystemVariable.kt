package penguin.penground.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.IdClass
import java.io.Serializable

class SystemVariableId(
    private val variableType: String,
    private val variableCode: String
) : Serializable

@IdClass(SystemVariableId::class)
@Entity
class SystemVariable(
    @Id
    val variableType: String,
    @Id
    val variableCode: String,
    @Column(nullable = false)
    val variableContent: String
)
