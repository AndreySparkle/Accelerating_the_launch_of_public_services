const { dialog } = require('@electron/remote');
const fs = require('fs');

// Инициализируем remote (добавьте в начало файла)
require('@electron/remote/main').initialize();

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
        const result = await dialog.showOpenDialog({
            filters: [{ name: 'JSON Files', extensions: ['json'] }],
            properties: ['openFile']
        });
        
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            const content = fs.readFileSync(filePath, 'utf8');
            jsonSchema = JSON.parse(content);
            document.getElementById('jsonSchemaStatus').textContent = `✓ ${filePath.split('/').pop()}`;
            document.getElementById('jsonSchemaStatus').style.color = 'green';
            checkReadyState();
        }
    } catch (error) {
        showError('Ошибка загрузки JSON схемы: ' + error.message);
    }
}

// Загрузка XSD схемы
async function loadXsdSchema() {
    try {
        const result = await dialog.showOpenDialog({
            filters: [{ name: 'XSD Files', extensions: ['xsd'] }],
            properties: ['openFile']
        });
        
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            xsdSchema = fs.readFileSync(filePath, 'utf8');
            document.getElementById('xsdSchemaStatus').textContent = `✓ ${filePath.split('/').pop()}`;
            document.getElementById('xsdSchemaStatus').style.color = 'green';
            checkReadyState();
        }
    } catch (error) {
        showError('Ошибка загрузки XSD схемы: ' + error.message);
    }
}

// Загрузка тестовых данных
async function loadTestData() {
    try {
        const result = await dialog.showOpenDialog({
            filters: [{ name: 'JSON Files', extensions: ['json'] }],
            properties: ['openFile', 'multiSelections']
        });
        
        if (!result.canceled && result.filePaths.length > 0) {
            testData = [];
            result.filePaths.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf8');
                testData.push(JSON.parse(content));
            });
            document.getElementById('testDataStatus').textContent = `✓ Загружено файлов: ${testData.length}`;
            document.getElementById('testDataStatus').style.color = 'green';
            checkReadyState();
        }
    } catch (error) {
        showError('Ошибка загрузки тестовых данных: ' + error.message);
    }
}

// Проверка готовности
function checkReadyState() {
    const isReady = jsonSchema && xsdSchema && testData.length > 0;
    document.getElementById('generateBtn').disabled = !isReady;
}

// Показ ошибок
function showError(message) {
    alert('Ошибка: ' + message);
}