import React, { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    Row,
    Col,
    Form,
    Select,
    Switch,
    Input,
    Button,
    Tabs,
    Divider,
    Space,
    ColorPicker,
    InputNumber,
    List,
    Tag,
    Popconfirm,
    message,
    Upload,
    Avatar
} from 'antd';
import {
    SettingOutlined,
    GlobalOutlined,
    DollarOutlined,
    BellOutlined,
    SecurityScanOutlined,
    UserOutlined,
    PlusOutlined,
    DeleteOutlined,
    TagOutlined,
    EditOutlined,
    UploadOutlined,
    SaveOutlined,
    FileOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const Settings = () => {
    // General settings state
    const [form] = Form.useForm();
    const [language, setLanguage] = useState('es');
    const [currency, setCurrency] = useState('USD');
    const [theme, setTheme] = useState('light');
    const [primaryColor, setPrimaryColor] = useState('#1890ff');
    const [secondaryColor, setSecondaryColor] = useState('#52c41a');
    const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
    const [showCents, setShowCents] = useState(true);
    const [startOfWeek, setStartOfWeek] = useState('monday');
    const [defaultView, setDefaultView] = useState('dashboard');
    
    // Categories state
    const [categories, setCategories] = useState([
        { id: 1, name: 'Alimentación', color: '#00C49F', icon: 'shopping-cart', isDefault: true },
        { id: 2, name: 'Transporte', color: '#0088FE', icon: 'car', isDefault: true },
        { id: 3, name: 'Entretenimiento', color: '#FFBB28', icon: 'play-circle', isDefault: true },
        { id: 4, name: 'Servicios', color: '#FF8042', icon: 'bulb', isDefault: true },
        { id: 5, name: 'Compras', color: '#A28BFC', icon: 'shopping', isDefault: true },
        { id: 6, name: 'Salud', color: '#FF6B6B', icon: 'medicine-box', isDefault: true },
        { id: 7, name: 'Educación', color: '#4ECDC4', icon: 'book', isDefault: true },
        { id: 8, name: 'Vivienda', color: '#C7F464', icon: 'home', isDefault: true },
        { id: 9, name: 'Otros', color: '#81B29A', icon: 'ellipsis', isDefault: true }
    ]);
    const [newCategory, setNewCategory] = useState({ name: '', color: '#1890ff', icon: 'tag' });
    const [editingCategory, setEditingCategory] = useState(null);
    
    // Account settings state
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Cuenta Principal', type: 'checking', balance: 5000, currency: 'USD', color: '#1890ff', isDefault: true },
        { id: 2, name: 'Ahorro', type: 'savings', balance: 10000, currency: 'USD', color: '#52c41a', isDefault: false },
        { id: 3, name: 'Tarjeta de Crédito', type: 'credit', balance: -1500, currency: 'USD', color: '#f5222d', isDefault: false }
    ]);
    const [newAccount, setNewAccount] = useState({ name: '', type: 'checking', balance: 0, currency: 'USD', color: '#1890ff' });
    const [editingAccount, setEditingAccount] = useState(null);
    
    // Notification settings state
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [lowBalanceAlerts, setLowBalanceAlerts] = useState(true);
    const [lowBalanceThreshold, setLowBalanceThreshold] = useState(100);
    const [billReminders, setBillReminders] = useState(true);
    const [reminderDays, setReminderDays] = useState(3);
    const [monthlyReports, setMonthlyReports] = useState(true);
    
    // Import/Export settings state
    const [exportFormat, setExportFormat] = useState('xlsx');
    const [importStatus, setImportStatus] = useState('');
    const [exportStatus, setExportStatus] = useState('');
    
    // Profile settings state
    const [name, setName] = useState('Usuario');
    const [email, setEmail] = useState('usuario@ejemplo.com');
    const [avatar, setAvatar] = useState(null);
    
    // Currency options
    const currencies = [
        { code: 'USD', symbol: '$', name: 'Dólar estadounidense' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'MXN', symbol: '$', name: 'Peso mexicano' },
        { code: 'COP', symbol: '$', name: 'Peso colombiano' },
        { code: 'ARS', symbol: '$', name: 'Peso argentino' },
        { code: 'CLP', symbol: '$', name: 'Peso chileno' },
        { code: 'PEN', symbol: 'S/', name: 'Sol peruano' },
        { code: 'BOB', symbol: 'Bs', name: 'Boliviano' },
        { code: 'VES', symbol: 'Bs.S', name: 'Bolívar soberano' },
        { code: 'BRL', symbol: 'R$', name: 'Real brasileño' }
    ];
    
    // Language options
    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
        { code: 'pt', name: 'Português' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' }
    ];
    
    // Account types
    const accountTypes = [
        { value: 'checking', label: 'Cuenta Corriente' },
        { value: 'savings', label: 'Cuenta de Ahorro' },
        { value: 'credit', label: 'Tarjeta de Crédito' },
        { value: 'investment', label: 'Inversión' },
        { value: 'cash', label: 'Efectivo' },
        { value: 'other', label: 'Otro' }
    ];
    
    // Date format options
    const dateFormats = [
        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' },
        { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY' }
    ];
    
    // View options
    const viewOptions = [
        { value: 'dashboard', label: 'Dashboard' },
        { value: 'transactions', label: 'Transacciones' },
        { value: 'reports', label: 'Informes' },
    ];
    
    // Day options
    const dayOptions = [
        { value: 'monday', label: 'Lunes' },
        { value: 'sunday', label: 'Domingo' },
        { value: 'saturday', label: 'Sábado' }
    ];
    
    // Icon options (limited for simplicity)
    const iconOptions = [
        'shopping-cart', 'car', 'home', 'bulb', 'medicine-box', 
        'coffee', 'dollar', 'credit-card', 'bank', 'book', 
        'shopping', 'gift', 'trophy', 'phone', 'wifi',
        'play-circle', 'tag', 'heart', 'star', 'ellipsis'
    ];

    // Load saved configuration on mount
    useEffect(() => {
        // Here you would typically load the configuration from localStorage or from an API
        // For this example, we're using the default values set in state
        
        form.setFieldsValue({
            language,
            currency,
            theme,
            primaryColor,
            secondaryColor,
            dateFormat,
            showCents,
            startOfWeek,
            defaultView,
            name,
            email
        });
    }, []);
    
    // Handle form submission
    const handleSaveGeneral = (values) => {
        // In a real app, you would save these values to an API or localStorage
        setLanguage(values.language);
        setCurrency(values.currency);
        setTheme(values.theme);
        setPrimaryColor(values.primaryColor);
        setSecondaryColor(values.secondaryColor);
        setDateFormat(values.dateFormat);
        setShowCents(values.showCents);
        setStartOfWeek(values.startOfWeek);
        setDefaultView(values.defaultView);
        
        message.success('Configuración general guardada correctamente');
    };
    
    // Categories handlers
    const handleAddCategory = () => {
        if (!newCategory.name.trim()) {
            message.error('El nombre de la categoría es obligatorio');
            return;
        }
        
        const newCategoryItem = {
            id: categories.length + 1,
            ...newCategory,
            isDefault: false
        };
        
        setCategories([...categories, newCategoryItem]);
        setNewCategory({ name: '', color: '#1890ff', icon: 'tag' });
        message.success('Categoría añadida correctamente');
    };
    
    const handleDeleteCategory = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        
        if (category.isDefault) {
            message.error('No se pueden eliminar las categorías predeterminadas');
            return;
        }
        
        setCategories(categories.filter(c => c.id !== categoryId));
        message.success('Categoría eliminada correctamente');
    };
    
    const startEditCategory = (category) => {
        setEditingCategory({ ...category });
    };
    
    const handleUpdateCategory = () => {
        if (!editingCategory || !editingCategory.name.trim()) {
            message.error('El nombre de la categoría es obligatorio');
            return;
        }
        
        setCategories(categories.map(c => 
            c.id === editingCategory.id ? editingCategory : c
        ));
        
        setEditingCategory(null);
        message.success('Categoría actualizada correctamente');
    };
    
    // Account handlers
    const handleAddAccount = () => {
        if (!newAccount.name.trim()) {
            message.error('El nombre de la cuenta es obligatorio');
            return;
        }
        
        const newAccountItem = {
            id: accounts.length + 1,
            ...newAccount,
            isDefault: accounts.length === 0
        };
        
        setAccounts([...accounts, newAccountItem]);
        setNewAccount({ name: '', type: 'checking', balance: 0, currency: 'USD', color: '#1890ff' });
        message.success('Cuenta añadida correctamente');
    };
    
    const handleDeleteAccount = (accountId) => {
        const account = accounts.find(a => a.id === accountId);
        
        if (account.isDefault) {
            message.error('No se puede eliminar la cuenta predeterminada. Establezca otra cuenta como predeterminada primero.');
            return;
        }
        
        setAccounts(accounts.filter(a => a.id !== accountId));
        message.success('Cuenta eliminada correctamente');
    };
    
    const startEditAccount = (account) => {
        setEditingAccount({ ...account });
    };
    
    const handleUpdateAccount = () => {
        if (!editingAccount || !editingAccount.name.trim()) {
            message.error('El nombre de la cuenta es obligatorio');
            return;
        }
        
        setAccounts(accounts.map(a => 
            a.id === editingAccount.id ? editingAccount : a
        ));
        
        setEditingAccount(null);
        message.success('Cuenta actualizada correctamente');
    };
    
    const setAccountAsDefault = (accountId) => {
        setAccounts(accounts.map(a => ({
            ...a,
            isDefault: a.id === accountId
        })));
        
        message.success('Cuenta predeterminada actualizada');
    };
    
    // Notification settings handlers
    const handleSaveNotifications = () => {
        // In a real app, you would save these values to an API or localStorage
        message.success('Configuración de notificaciones guardada correctamente');
    };
    
    // Import/Export handlers
    const handleExport = () => {
        setExportStatus('Exportando datos...');
        
        // Simulate export process
        setTimeout(() => {
            setExportStatus('');
            message.success(`Datos exportados correctamente en formato ${exportFormat.toUpperCase()}`);
        }, 1500);
    };
    
    const handleImport = (info) => {
        if (info.file.status === 'uploading') {
            setImportStatus('Importando datos...');
            return;
        }
        
        if (info.file.status === 'done') {
            setImportStatus('');
            message.success(`${info.file.name} importado correctamente`);
        } else if (info.file.status === 'error') {
            setImportStatus('');
            message.error(`Error al importar ${info.file.name}`);
        }
    };
    
    // Profile settings handlers
    const handleSaveProfile = () => {
        if (!name.trim() || !email.trim()) {
            message.error('Nombre y correo electrónico son obligatorios');
            return;
        }
        
        // In a real app, you would save these values to an API or localStorage
        message.success('Perfil actualizado correctamente');
    };
    
    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            // Normally, you'd get the URL from the server response
            // Here we're simulating it for demo purposes
            setAvatar(URL.createObjectURL(info.file.originFileObj));
            message.success('Avatar actualizado correctamente');
        }
    };
    
    return (
        <div className="configuration-container">
            <div className="configuration-header">
                <div className="header-title">
                    <SettingOutlined className="configuration-icon" />
                    <Title level={2}>Configuración</Title>
                </div>
            </div>
            
            <Card className="configuration-card">
                <Tabs defaultActiveKey="general">
                    {/* General Settings Tab */}
                    <TabPane 
                        tab={<span><SettingOutlined />General</span>}
                        key="general"
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSaveGeneral}
                            initialValues={{
                                language,
                                currency,
                                theme,
                                primaryColor,
                                secondaryColor,
                                dateFormat,
                                showCents,
                                startOfWeek,
                                defaultView
                            }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item 
                                        name="language" 
                                        label="Idioma"
                                        rules={[{ required: true, message: 'Por favor seleccione un idioma' }]}
                                    >
                                        <Select onChange={(value) => setLanguage(value)}>
                                            {languages.map(lang => (
                                                <Option key={lang.code} value={lang.code}>{lang.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item 
                                        name="currency" 
                                        label="Moneda"
                                        rules={[{ required: true, message: 'Por favor seleccione una moneda' }]}
                                    >
                                        <Select onChange={(value) => setCurrency(value)}>
                                            {currencies.map(curr => (
                                                <Option key={curr.code} value={curr.code}>
                                                    {curr.symbol} - {curr.name} ({curr.code})
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item 
                                        name="theme" 
                                        label="Tema"
                                        rules={[{ required: true, message: 'Por favor seleccione un tema' }]}
                                    >
                                        <Select onChange={(value) => setTheme(value)}>
                                            <Option value="light">Claro</Option>
                                            <Option value="dark">Oscuro</Option>
                                            <Option value="system">Sistema</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item 
                                        name="primaryColor" 
                                        label="Color primario"
                                    >
                                        <ColorPicker 
                                            value={primaryColor} 
                                            onChange={(color) => setPrimaryColor(color.toHexString())} 
                                        />
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item 
                                        name="secondaryColor" 
                                        label="Color secundario"
                                    >
                                        <ColorPicker 
                                            value={secondaryColor} 
                                            onChange={(color) => setSecondaryColor(color.toHexString())} 
                                        />
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item 
                                        name="dateFormat" 
                                        label="Formato de fecha"
                                        rules={[{ required: true, message: 'Por favor seleccione un formato de fecha' }]}
                                    >
                                        <Select onChange={(value) => setDateFormat(value)}>
                                            {dateFormats.map(format => (
                                                <Option key={format.value} value={format.value}>{format.label}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={8} md={6}>
                                    <Form.Item 
                                        name="showCents" 
                                        label="Mostrar céntimos" 
                                        valuePropName="checked"
                                    >
                                        <Switch onChange={(checked) => setShowCents(checked)} />
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={8} md={6}>
                                    <Form.Item 
                                        name="startOfWeek" 
                                        label="Inicio de semana"
                                        rules={[{ required: true, message: 'Por favor seleccione el día de inicio de semana' }]}
                                    >
                                        <Select onChange={(value) => setStartOfWeek(value)}>
                                            {dayOptions.map(day => (
                                                <Option key={day.value} value={day.value}>{day.label}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                
                                <Col xs={24} sm={8} md={12}>
                                    <Form.Item 
                                        name="defaultView" 
                                        label="Vista predeterminada"
                                        rules={[{ required: true, message: 'Por favor seleccione una vista predeterminada' }]}
                                    >
                                        <Select onChange={(value) => setDefaultView(value)}>
                                            {viewOptions.map(view => (
                                                <Option key={view.value} value={view.value}>{view.label}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                            <Divider />
                            
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                    Guardar Configuración
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    
                    {/* Categories Tab */}
                    <TabPane 
                        tab={<span><TagOutlined />Categorías</span>}
                        key="categories"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Card title="Añadir Nueva Categoría" size="small">
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Input
                                                placeholder="Nombre de la categoría"
                                                value={newCategory.name}
                                                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                                                style={{ marginBottom: 16 }}
                                            />
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <div style={{ marginBottom: 16 }}>
                                                <Text>Color:</Text>
                                                <div style={{ marginTop: 8 }}>
                                                    <ColorPicker
                                                        value={newCategory.color}
                                                        onChange={(color) => setNewCategory({...newCategory, color: color.toHexString()})}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <div style={{ marginBottom: 16 }}>
                                                <Text>Icono:</Text>
                                                <div style={{ marginTop: 8 }}>
                                                    <Select
                                                        value={newCategory.icon}
                                                        onChange={(value) => setNewCategory({...newCategory, icon: value})}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {iconOptions.map(icon => (
                                                            <Option key={icon} value={icon}>{icon}</Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                    <Button 
                                        type="primary" 
                                        icon={<PlusOutlined />} 
                                        onClick={handleAddCategory}
                                        style={{ marginTop: 8 }}
                                    >
                                        Añadir Categoría
                                    </Button>
                                </Card>
                                
                                {editingCategory && (
                                    <Card title="Editar Categoría" size="small" style={{ marginTop: 16 }}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={24}>
                                                <Input
                                                    placeholder="Nombre de la categoría"
                                                    value={editingCategory.name}
                                                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                                                    style={{ marginBottom: 16 }}
                                                />
                                            </Col>
                                            
                                            <Col xs={12}>
                                                <div style={{ marginBottom: 16 }}>
                                                    <Text>Color:</Text>
                                                    <div style={{ marginTop: 8 }}>
                                                        <ColorPicker
                                                            value={editingCategory.color}
                                                            onChange={(color) => setEditingCategory({...editingCategory, color: color.toHexString()})}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            
                                            <Col xs={12}>
                                                <div style={{ marginBottom: 16 }}>
                                                    <Text>Icono:</Text>
                                                    <div style={{ marginTop: 8 }}>
                                                        <Select
                                                            value={editingCategory.icon}
                                                            onChange={(value) => setEditingCategory({...editingCategory, icon: value})}
                                                            style={{ width: '100%' }}
                                                        >
                                                            {iconOptions.map(icon => (
                                                                <Option key={icon} value={icon}>{icon}</Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Space>
                                            <Button 
                                                type="primary" 
                                                onClick={handleUpdateCategory}
                                            >
                                                Guardar Cambios
                                            </Button>
                                            <Button onClick={() => setEditingCategory(null)}>
                                                Cancelar
                                            </Button>
                                        </Space>
                                    </Card>
                                )}
                            </Col>
                            
                            <Col xs={24} md={12}>
                                <Card title="Categorías Existentes" size="small">
                                    <List
                                        dataSource={categories}
                                        renderItem={category => (
                                            <List.Item
                                                actions={[
                                                    <Button 
                                                        type="text" 
                                                        icon={<EditOutlined />}
                                                        onClick={() => startEditCategory(category)}
                                                        disabled={editingCategory !== null}
                                                    />,
                                                    <Popconfirm
                                                        title="¿Estás seguro de eliminar esta categoría?"
                                                        onConfirm={() => handleDeleteCategory(category.id)}
                                                        okText="Sí"
                                                        cancelText="No"
                                                        disabled={category.isDefault}
                                                    >
                                                        <Button 
                                                            type="text" 
                                                            danger 
                                                            icon={<DeleteOutlined />}
                                                            disabled={category.isDefault}
                                                        />
                                                    </Popconfirm>
                                                ]}
                                            >
                                                <List.Item.Meta
                                                    avatar={
                                                        <div 
                                                            style={{ 
                                                                backgroundColor: category.color,
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: 12,
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        />
                                                    }
                                                    title={
                                                        <Space>
                                                            {category.name}
                                                            {category.isDefault && <Tag color="blue">Predeterminada</Tag>}
                                                        </Space>
                                                    }
                                                    description={`Icono: ${category.icon}`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    
                    {/* Accounts Tab */}
                    <TabPane 
                        tab={<span><DollarOutlined />Cuentas</span>}
                        key="accounts"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Card title="Añadir Nueva Cuenta" size="small">
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Input
                                                placeholder="Nombre de la cuenta"
                                                value={newAccount.name}
                                                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                                                style={{ marginBottom: 16 }}
                                            />
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <Select
                                                placeholder="Tipo de cuenta"
                                                value={newAccount.type}
                                                onChange={(value) => setNewAccount({...newAccount, type: value})}
                                                style={{ width: '100%', marginBottom: 16 }}
                                            >
                                                {accountTypes.map(type => (
                                                    <Option key={type.value} value={type.value}>{type.label}</Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <Select
                                                placeholder="Moneda"
                                                value={newAccount.currency}
                                                onChange={(value) => setNewAccount({...newAccount, currency: value})}
                                                style={{ width: '100%', marginBottom: 16 }}
                                            >
                                                {currencies.map(curr => (
                                                    <Option key={curr.code} value={curr.code}>
                                                        {curr.symbol} - {curr.code}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <InputNumber
                                                placeholder="Saldo inicial"
                                                value={newAccount.balance}
                                                onChange={(value) => setNewAccount({...newAccount, balance: value})}
                                                style={{ width: '100%', marginBottom: 16 }}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
}

export default Settings;