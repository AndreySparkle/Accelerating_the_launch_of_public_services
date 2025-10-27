class VmGenerator {
    static generateTemplate(jsonSchema, xsdSchema, testData) {
        console.log('Генерация VM шаблона из реальной XSD...');
        
        let template = `## Velocity Template for EPGU to VIS Integration
## Generated automatically from XSD schema
<?xml version="1.0" encoding="UTF-8"?>
<AppDataRequest xmlns="http://socit.ru/kalin/orders/2.0.0">\n`;

        // Генерируем основную структуру SetRequest
        template += this.generateSetRequest(jsonSchema, testData);
        
        template += `</AppDataRequest>`;
        return template;
    }
    
    static generateSetRequest(jsonSchema, testData) {
        let setRequest = `  <SetRequest>\n`;
        
        // Основные поля заявления
        if (jsonSchema.formData) {
            setRequest += this.generateFormFields(jsonSchema.formData);
        }
        
        // Персональные данные
        if (jsonSchema.c7) {
            setRequest += this.generateUserData(jsonSchema.c7);
        }
        
        setRequest += `  </SetRequest>\n`;
        return setRequest;
    }
    
    static generateFormFields(formData) {
        let fields = '';
        
        const fieldMappings = {
            'orderId': 'orderId',
            'ServiceCode': 'ServiceCode', 
            'ServiceName': 'ServiceName'
        };
        
        for (const [jsonField, xmlField] of Object.entries(fieldMappings)) {
            if (formData[jsonField]) {
                fields += `    <${xmlField}>${formData[jsonField]}</${xmlField}>\n`;
            }
        }
        
        return fields;
    }
    
    static generateUserData(userData) {
        let userDataBlock = `    <userData>\n`;
        
        const fieldMappings = {
            'lastName': 'lastName',
            'firstName': 'firstName',
            'middleName': 'middleName',
            'birthDate': 'birthDate',
            'Sex': 'Sex',
            'Snils': 'Snils', 
            'Inn': 'Inn',
            'phone': 'phone',
            'Email': 'Email',
            'citizenship': 'citizenship'
        };
        
        for (const [jsonField, xmlField] of Object.entries(fieldMappings)) {
            if (userData[jsonField]) {
                userDataBlock += `      <${xmlField}>$c7.${jsonField}</${xmlField}>\n`;
            }
        }
        
        userDataBlock += `    </userData>\n`;
        return userDataBlock;
    }
}

module.exports = VmGenerator;