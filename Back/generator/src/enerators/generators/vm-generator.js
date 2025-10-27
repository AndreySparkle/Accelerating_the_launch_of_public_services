class VmGenerator {
    static generateTemplate(jsonSchema, xsdSchema, testData) {
        // Основная логика генерации VM-шаблона
        let template = `<?xml version="1.0" encoding="UTF-8"?>\n<Application>\n`;
        
        if (jsonSchema.c7) {
            for (const fieldName in jsonSchema.c7) {
                const xmlTag = this.capitalizeFirst(fieldName);
                template += this.generateFieldMapping(fieldName, xmlTag);
            }
        }
        
        template += `</Application>`;
        return template;
    }
    
    static generateFieldMapping(jsonField, xmlTag) {
        return `  #if( $c7.${jsonField} )\n  <${xmlTag}>$c7.${jsonField}</${xmlTag}>\n  #end\n\n`;
    }
    
    static capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

module.exports = VmGenerator;