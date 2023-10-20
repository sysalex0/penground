// package penguin.penground.model
//
// import jakarta.persistence.*
// import java.io.Serializable
//
// class SystemVariableId(
//    private val variableType: String,
//    private val variableCode: String
// ) : Serializable
//
// @Table(name = "`system_variable`")
// @IdClass(SystemVariableId::class)
// @Entity
// class SystemVariable(
//    @Id
//    @Column(name = "variable_type")
//    val variableType: String,
//    @Id
//    @Column(name = "variable_code", columnDefinition = "VARCHAR(255) DEFAULT 'DEFAULT'")
//    val variableCode: String,
//    @Column(name = "variable_content", nullable = false)
//    val variableContent: String
// )
