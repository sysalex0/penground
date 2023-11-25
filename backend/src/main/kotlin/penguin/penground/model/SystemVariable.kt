package penguin.penground.model

import jakarta.persistence.Column
import jakarta.persistence.Embeddable
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import java.io.Serializable

@Embeddable
class SystemVariableId(
    val variableType: String,
    val variableCode: String
) : Serializable

@Entity
class SystemVariable(
    @EmbeddedId
    val systemVariableId: SystemVariableId,
    @Column(nullable = false)
    val variableContent: String
)
