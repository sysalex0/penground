package penguin.penground.model

import penguin.penground.model.key.SystemVariableId
import java.io.Serializable
import javax.persistence.*

@Table(name = "`system_variable`")
@IdClass(SystemVariableId::class)
@Entity
data class SystemVariable (
    @Id
    @Column(name = "variable_type")
    private val variableType: String,
    @Id
    @Column(name = "variable_code", columnDefinition = "VARCHAR(255) DEFAULT 'DEFAULT'")
    private val variableCode: String,
    @Column(name = "variable_content", nullable = false)
    private val variableContent: String
): Serializable