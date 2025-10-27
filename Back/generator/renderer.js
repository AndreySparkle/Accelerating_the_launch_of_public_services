const { ipcRenderer } = require('electron');

let jsonSchema = null;
let xsdSchema = null;
let testData = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

function initializeEventListeners() {
    document.getElementById('loadJsonSchema').addEventListener('click', loadJsonSchema);
    document.getElementById('loadXsdSchema').addEventListener('click', loadXsdSchema);
    document.getElementById('loadTestData').addEventListener('click', loadTestData);
    document.getElementById('generateBtn').addEventListener('click', generateTemplate);
    document.getElementById('saveBtn').addEventListener('click', saveTemplate);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
}

// Загрузка JSON схемы
async function loadJsonSchema() {
    try {
        console.log('Открываем диалог для JSON...');
        const result = await ipcRenderer.invoke('dialog:openFile', {
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        
        console.log('Результат диалога:', result);
        
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            console.log('Выбран файл:', filePath);
            
            const content = await ipcRenderer.invoke('file:read', filePath);
            jsonSchema = JSON.parse(content);
            
            document.getElementById('jsonSchemaStatus').textContent = `✓ ${getFileName(filePath)}`;
            document.getElementById('jsonSchemaStatus').className = 'status ready';
            checkReadyState();
            
            showSuccess(`JSON схема загружена: ${getFileName(filePath)}`);
        }
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
        showError('Ошибка загрузки JSON схемы: ' + error.message);
    }
}

// Загрузка XSD схемы
async function loadXsdSchema() {
    try {
        console.log('Открываем диалог для XSD...');
        const result = await ipcRenderer.invoke('dialog:openFile', {
            filters: [
                { name: 'XSD Files', extensions: ['xsd'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        
        console.log('Результат диалога:', result);
        
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            console.log('Выбран файл:', filePath);
            
            xsdSchema = await ipcRenderer.invoke('file:read', filePath);
            
            document.getElementById('xsdSchemaStatus').textContent = `✓ ${getFileName(filePath)}`;
            document.getElementById('xsdSchemaStatus').className = 'status ready';
            checkReadyState();
            
            showSuccess(`XSD схема загружена: ${getFileName(filePath)}`);
        }
    } catch (error) {
        console.error('Ошибка загрузки XSD:', error);
        showError('Ошибка загрузки XSD схемы: ' + error.message);
    }
}

// Загрузка тестовых данных
async function loadTestData() {
    try {
        console.log('Открываем диалог для тестовых данных...');
        const result = await ipcRenderer.invoke('dialog:openFile', {
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile', 'multiSelections']
        });
        
        console.log('Результат диалога:', result);
        
        if (!result.canceled && result.filePaths.length > 0) {
            testData = [];
            
            for (const filePath of result.filePaths) {
                console.log('Обрабатываем файл:', filePath);
                const content = await ipcRenderer.invoke('file:read', filePath);
                testData.push(JSON.parse(content));
            }
            
            document.getElementById('testDataStatus').textContent = `✓ Загружено файлов: ${testData.length}`;
            document.getElementById('testDataStatus').className = 'status ready';
            checkReadyState();
            
            showSuccess(`Загружено тестовых файлов: ${testData.length}`);
        }
    } catch (error) {
        console.error('Ошибка загрузки тестовых данных:', error);
        showError('Ошибка загрузки тестовых данных: ' + error.message);
    }
}

// Проверка готовности
function checkReadyState() {
    const isReady = jsonSchema && xsdSchema && testData.length > 0;
    document.getElementById('generateBtn').disabled = !isReady;
    console.log('Готовность к генерации:', isReady, { jsonSchema: !!jsonSchema, xsdSchema: !!xsdSchema, testData: testData.length });
}

// Генерация шаблона
async function generateTemplate() {
    try {
        console.log('Начинаем генерацию шаблона...');
        showLoading(true);
        
        const vmTemplate = generateVMTemplate(jsonSchema, xsdSchema, testData);
        
        document.getElementById('result').value = vmTemplate;
        document.getElementById('resultSection').style.display = 'block';
        
        showSuccess('Шаблон успешно сгенерирован!');
        
    } catch (error) {
        console.error('Ошибка генерации:', error);
        showError('Ошибка генерации шаблона: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Основная функция генерации VM-шаблона
function generateVMTemplate(jsonSchema, xsdSchema, testData) {
    console.log('Генерация VM шаблона...');
    console.log('JSON Schema:', jsonSchema);
    console.log('Test data count:', testData.length);
    
    let template = `## Velocity Template for EPGU to VIS Integration
## Generated automatically
<?xml version="1.0" encoding="UTF-8"?>
<AppDataRequest xmlns="http://socit.ru/kalin/orders/2.0.0">
  <SetRequest>
`;

    // Основные поля заявления
    if (jsonSchema.formData) {
        template += generateFormFields(jsonSchema.formData);
    }

    // Персональные данные из компонента c7
    if (jsonSchema.c7) {
        template += generateUserData(jsonSchema.c7);
    }

    template += `  </SetRequest>
</AppDataRequest>`;
    
    return template;
}

function generateFormFields(formData) {
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

function generateUserData(userData) {
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

// Сохранение шаблона
async function saveTemplate() {
    try {
        const content = document.getElementById('result').value;
        const result = await ipcRenderer.invoke('dialog:saveFile', {
            filters: [
                { name: 'VM Templates', extensions: ['vm'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            defaultPath: 'generated_template.vm'
        });
        
        if (!result.canceled) {
            await ipcRenderer.invoke('file:write', result.filePath, content);
            showSuccess(`Шаблон сохранен: ${getFileName(result.filePath)}`);
        }
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showError('Ошибка сохранения: ' + error.message);
    }
}

// Копирование в буфер
async function copyToClipboard() {
    try {
        const content = document.getElementById('result').value;
        await navigator.clipboard.writeText(content);
        showSuccess('Скопировано в буфер обмена!');
    } catch (error) {
        console.error('Ошибка копирования:', error);
        showError('Ошибка копирования: ' + error.message);
    }
}

// Вспомогательные функции
function getFileName(filePath) {
    return filePath.split(/[\\/]/).pop();
}

function showLoading(show) {
    const btn = document.getElementById('generateBtn');
    const btnText = btn.querySelector('.btn-text');
    
    if (show) {
        btnText.textContent = 'Генерация...';
        btn.disabled = true;
    } else {
        btnText.textContent = 'Сгенерировать шаблон';
        btn.disabled = false;
    }
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 4000);
}

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);