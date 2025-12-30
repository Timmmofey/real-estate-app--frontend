export const ru = {
    tabTitle: {
        classified: "Classified App"
    },

    /////////////
    //Components
    /////////////

    header: {
        buyPage: "Покупка",
        rentPage: "Аренда",
        salePage: "Продажа",
        listingsPage: "Мои объявления",
        signInUp: "Войти"
    },
    footer: {
        allRightsReserved: "Все права защищены"
    },
    loginForm: {
        title: "Вход в аккаунт",
        description: "Введите свой email или телефон для входа в аккаунт",
        emailLabel: "Телефон или Email",
        emailPlaceholder: "m@example.com или 12345...",
        passwordLabel: "Пароль",
        forgotPassword: "Забыли пароль?",
        loginButton: "Войти",
        loginButtonLoading: "Вход...",
        loginGoogle: "Войти через Google",
        signupPrompt: "Нет аккаунта?",
        signupLink: "Зарегистрироваться",
        toastSuccess: "Вы успешно вошли!",
        toastErrorTitle: "Ошибка входа",
        toastErrorDescription: "Проверьте правильность данных",
        toast2FA: "Необходима двухфакторная аутентификация",
        toastLoginSuccess: "Добро пожаловать!",
        toastResorationMode: "Аккаунт в режиме восстановления",
        toastNoReasponse: "Нет ответа от сервиса входа"
    }, 
    editPersonProfileForm: {
        notPersonProfile: "Не профиль пользователя",
        firstNameLabel: "Имя",
        firstNamePlaceholder: "Введите имя",
        lastNameLabel: "Фамилия",
        lastNamePlaceholder: "Введите фамилию",
        profilePhotoLabel: "Фото профиля",
        avatarPreviewAlt: "Превью аватара",
        choosePhoto: "Выбрать новое фото",
        deletePhoto: "Удалить фото",
        save: "Сохранить изменения",
        saving: "Сохранение...",
        successToast: "Изменения успешно сохранены"
    },
    editCompanyProfileForm: {
        nameLabel: "Название компании",
        namePlaceholder: "Введите название компании",
        registrationAddressLabel: "Улица, здание, офис",
        companyRegNumLabel: "Регистрационный номер компании",
        estimatedAtLabel: "Дата основания",
        descriptionLabel: "Описание",
        companyPhotoLabel: "Фотография компании",
        companyPhotoAlt: "Фото компании",
        choosePhoto: "Выбрать новую фотографию",
        deletePhoto: "Удалить фотографию",
        save: "Сохранить изменения",
        saving: "Сохранение...",
        successToast: "Изменения успешно сохранены"
    },
    addressFields:{
        countryLabel: "Страна",
        countryPlaceholder: "Выберите страну",
        regionLabel: "Регион",
        regionPlaceholder: "Выберите регион",
        settlementPlaceholder: "Введите населённый пункт",
        streetLabel: "Улица, здание, офис",
        streetPlaceholder: "10 Main st.",
        zipLabel: "Почтовый индекс",
        zipPlaceholder: "Индекс",
        zipRequired: "Обязательно",
        zipFormat: "Формат:",
        none: "Нет",
    },
    settlementAutocomplete:{
        settlement: "Населённый пункт",
        clear: "Очистить",
        chooseFromTheList: "Или выберете из списка",
        loading: "Загрузка...",
        error: "Не удалось загрузить список",
        noResults: "Населённых пунктов не найдено",
    },
    userSideBar:{
        profileLink: "Профиль",
        settingsLink: "Настройки",
        myListings: "Мои объявления",
        favorites: "Избранное",
        messages: "Сообщения",
        support: "Поддержка",
        logInError: "Пользователь не найден",
        logout: "Выйти"
    },
    languageSelector: {
        toggleTheme: "Переключить тему",
        light:"Светлая",
        dark: "Темная",
        system: "Системная"
    },
    mobileMenu:{
        Home: "Главная"
    },
    deviceAndActivitySection: {
        currentSession: "Текущая сессия",
        activeNow: "Активна прямо сейчас на этом устройстве",
        otherSessions: "Другие сессии",
        noOtherSessions: "Нет других сессий",
        activeAt: "Активна ",
        showMore: "Показать оставшиеся сессии",
        hide: "Скрыть",
        totalSessions: "Всего сессий",
        deviceUsage: "Устройства",
        locations: "Локации",
        logoutAll: "Выйти из всех сессий",
        logoutConfirmTitle: "Вы уверены, что хотите выйти из всех сессий?",
        logoutConfirmDescription:"Это действие нельзя отменить. Для последующих сессий нужно будет снова войти в систему.",
        logoutCancel: "Отмена",
        logoutContinue: "Продолжить",
        toastFailedToLogOutAllSessions: "Не удалось выйти из всех сессий",
        toastSuccesLogOutAllSessions: "Все сессии успешно закрыты"
    },
    contactCard: {
        clipboard: "добавлен в буфер обмена",
        edit: "Изменить"
    },
    deleteAccountSection: {
        succesToast: "Аккаунт успешно удален",
        errorToast: "Возникла ошибка при удалении аккаунта",
        deleteAccount: "Удалить аккаунт",
        deleteAccountConfirmTitle: "Вы уверены что хотите удалить аккаунт?",
        deleteAccountConfirmDescription: "Ваш аккаунт будет полность удален через 6 месяцев без возможности восстановления, чтобы восстановить или полностью удалить аккаунт войдите в него через форму лоигна.",
        cancelDelete: "Отмена",
        submitDelete: "Удвлить аккаунт"
    },
    twoFactorAuthSection: {
        currentStatus: "Текущий статус",
        enabled: "Включена",
        disabled: "Отключена",
        enable: "Включить",
        disable: "Отключить",
        infoText: "Двухфакторная аутентификация (2FA) повышает безопасность вашего аккаунта, требуя подтверждение входа через код, отправленный на почту или телефон. Включите 2FA, чтобы защитить данные от несанкционированного доступа.",
        enableTitle: "Включить 2FA",
        disableTitle: "Отключить 2FA",
        enableDescription: "Вы собираетесь включить двухфакторную аутентификацию. Это повысит безопасность вашего аккаунта.",
        disableDescription: "Вы собираетесь отключить двухфакторную аутентификацию. Ваш аккаунт станет менее защищённым.",
        requestCode: "Запросить код",
        requesting: "Запрос...",
        cancel: "Отмена",
        codeLabel: "Код подтверждения",
        enterCodePlaceholder: "Введите код",
        confirm: "Подтвердить",
        confirming: "Подтверждение...",
        back: "Назад",
        codeSentToast: "Код отправлен. Введите его ниже.",
        requestErrorToast: "Ошибка при запросе кода.",
        emptyCodeToast: "Пожалуйста, введите код.",
        enabledSuccessToast: "Двухфакторная аутентификация включена.",
        disabledSuccessToast: "Двухфакторная аутентификация отключена.",
        confirmErrorToast: "Ошибка при подтверждении кода."
    },
    changePasswordSection: {
        changePasswordTitle: "Смена пароля",
        changePassword: "Сменить пароль",
        changePasswordHint: "Используйте надёжный пароль и не сообщайте его другим.",
        oldPasswordLabel: "Текущий пароль",
        oldPasswordPlaceholder: "Введите текущий пароль",
        newPasswordLabel: "Новый пароль",
        newPasswordPlaceholder: "Введите новый пароль",
        confirmPasswordLabel: "Подтвердите новый пароль",
        confirmPasswordPlaceholder: "Повторите новый пароль",
        cancel: "Отмена",
        changing: "Смена...",
        successToast: "Пароль успешно изменён",
        errorToast: "Ошибка при смене пароля",
        emptyFieldsToast: "Пожалуйста, заполните все поля",
        passwordMismatchToast: "Пароли не совпадают",
        forgotPassword: "Не помню пароль"
    },
    createPasswordSection: {
        createPasswordHint: "Вы можете добавить дополнительный способ входа через пароль, создав его",
        createPassword: "Создать пароль"
    },
    oAuthSection: {
        loadError: "Не удалось загрузить OAuth аккаунты",
        authServiceUrlNotConfigured: "URL сервиса аутентификации не настроен",
        linkError: "Не удалось подключить аккаунт",

        connectWithGoogle: "Подключить Google",
        connectWithApple: "Подключить Apple",

        disconnectGoogle: "Отключить Google",
        disconnectApple: "Отключить Apple",

        disconnectGoogleTitle: "Отключить аккаунт Google?",
        disconnectAppleTitle: "Отключить аккаунт Apple?",

        disconnectGoogleDescription: "Вы уверены, что хотите отключить свой аккаунт Google?",
        disconnectAppleDescription: "Вы уверены, что хотите отключить свой аккаунт Apple?",

        connectedGoogleDescription: "Ваш аккаунт Google подключен. Вы можете войти через Google",
        connectGoogleDescription: "Подключите ваш аккаунт Google, чтобы упростить вход в будущем.",

        connectedAppleDescription: "Ваш аккаунт Apple подключен.",
        connectAppleDescription: "Подключите ваш аккаунт Apple, чтобы упростить вход в будущем.",

        cancel: "Отмена"
    },

    /////////////
    //Constants
    /////////////
    
    countries: {
        US: "США",
        CA: "Канада",
    },
    regions: {
        US: {
            AL: "Алабама",
            AK: "Аляска",
            AZ: "Аризона",
            AR: "Арканзас",
            CA: "Калифорния",
            CO: "Колорадо",
            CT: "Коннектикут",
            DE: "Делавэр",
            FL: "Флорида",
            GA: "Джорджия",
            HI: "Гавайи",
            ID: "Айдахо",
            IL: "Иллинойс",
            IN: "Индиана",
            IA: "Айова",
            KS: "Канзас",
            KY: "Кентукки",
            LA: "Луизиана",
            ME: "Мэн",
            MD: "Мэриленд",
            MA: "Массачусетс",
            MI: "Мичиган",
            MN: "Миннесота",
            MS: "Миссисипи",
            MO: "Миссури",
            MT: "Монтана",
            NE: "Небраска",
            NV: "Невада",
            NH: "Нью-Гэмпшир",
            NJ: "Нью-Джерси",
            NM: "Нью-Мексико",
            NY: "Нью-Йорк",
            NC: "Северная Каролина",
            ND: "Северная Дакота",
            OH: "Огайо",
            OK: "Оклахома",
            OR: "Орегон",
            PA: "Пенсильвания",
            RI: "Род-Айленд",
            SC: "Южная Каролина",
            SD: "Южная Дакота",
            TN: "Теннесси",
            TX: "Техас",
            UT: "Юта",
            VT: "Вермонт",
            VA: "Вирджиния",
            WA: "Вашингтон",
            WV: "Западная Вирджиния",
            WI: "Висконсин",
            WY: "Вайоминг",
        },
        CA: {
            AB: "Альберта",
            BC: "Британская Колумбия",
            MB: "Манитоба",
            NB: "Нью-Брансуик",
            NL: "Ньюфаундленд и Лабрадор",
            NS: "Новая Шотландия",
            ON: "Онтарио",
            PE: "Остров Принца Эдуарда",
            QC: "Квебек",
            SK: "Саскачеван",
            NT: "Северо-Западные территории",
            NU: "Нунавут",
            YT: "Юкон",
        }
    },
    deviceTypes: {
        Bot: "Бот",
        Mobile: "Телефон",
        Tablet: "Планшет",
        Desktop: "Компьютер",
        SmartTv: "Смарт ТВ",
    },

    /////////////
    //Pages
    /////////////

    logInPage: {
        thisGoogleAccountEmailIsAlredyConnected: "Чтобы привязать данный Google аккаунт сначала войдите по его эл. почте через пароль" 
    },
    homePage : {
        welcome: "Добро пожаловать",
        homeMessage: "Сюда будет добавлен классный контетнет, но позже :)"
    },
    setPasswordMultiStepFormwordPage: {
        resetPasswordTitle: "Сброс пароля",
        createPasswordTitle: "Создание пароля",
        sendVerificationCodeHint: "Для подтверждения владения аккаунтом на вашу почту будет отправлен верификационный код",
        emailLabel: "Эл. почта",
        sendButton: "Отправить код",
        sendButtonLoading: "Отправка...",
        codeLabel: "Код подтверждения",
        codeDescription: "Введите код подтверждения, отправленный на вашу почту.",
        verifyButton: "Подтвердить код",
        verifyButtonLoading: "Проверка...",
        newPasswordLabel: "Новый пароль",
        resetButton: "Сбросить пароль",
        resetButtonLoading: "Сброс...",
        toastSendSuccess: "Код подтверждения отправлен на почту",
        toastSendError: "Не удалось отправить код",
        toastVerifySuccess: "Код подтверждён",
        toastVerifyError: "Не удалось подтвердить код",
        toastResetSuccess: "Пароль успешно сброшен!",
        toastCreationSuccess: "Пароль успешно создан!",
        toastResetError: "Не удалось сбросить пароль",
        toastCreationError: "Не удалось создать пароль",
    },
    profilePage:{
        notAuthorized: "Вы не авторизованы",
        verifiedUser: "Подтверждённый пользователь",
        verifiedCompany: "Подтверждённая компания",
        edit: "Редактировать",
        someContent: "Здесь позже появится контент",
    },
    editProfilePage:{
        title: "Редактирование профиля"
    },
    signUpPage:{
        registerAs: "Зарегисроваться как",
        person: "Пользователь",
        company: "Компания",
        email: "Email",
        password: "Пароль",
        phoneNumber: "Телефон",
        firstName: "Имя",
        lastName: "Фамилия",
        companyName: "Название компании",
        companyRegistrationNumber: "Регистрационный номер",
        establishedAt: "Основана",
        description: "Описание (опционально)",
        profilePhoto: "Фото",
        choosePhoto: "Выбрать фото",
        remove: "Удалить",
        register: "Зарегистрироваться",
        registering: "Регистрация...",
        
        personRegisteredToast: "Пользователь зарегистрирован",
        companyRegisteredToast: "Компания заргистрирована",
        unexpectedErrorToast: "Регистрация не удалась",

    },
    changeEmailPage: {
        title: "Смена email",
        step: "Шаг",
        of: "из",

        step1_description: "Мы отправим код подтверждения на ваш текущий email. Введите его на следующем шаге, чтобы подтвердить, что именно вы владелец аккаунта.",
        step1_button: "Отправить код на текущий email",

        step2_description: "Введите код, который пришёл на ваш текущий email. Это нужно, чтобы подтвердить, что у вас есть доступ к нему.",
        step2_label: "Код подтверждения",
        step2_button: "Подтвердить",
        step2_button_loading: "Проверяем...",

        step3_description: "Теперь укажите новый email, на который мы отправим код подтверждения.",
        step3_label: "Новый email",
        step3_button: "Отправить код на новый email",
        step3_button_loading: "Отправляем...",

        step4_description: "Введите код, который пришёл на ваш новый email, чтобы мы убедились, что он принадлежит вам.",
        step4_label: "Код подтверждения нового email",
        step4_button: "Подтвердить",
        step4_button_loading: "Проверяем...",

        step5_description: "Все проверки пройдены. Теперь вы можете завершить смену почты.",
        step5_button: "Завершить смену email",

        step1_success: "Код отправлен на ваш текущий email",
        step1_error: "Не удалось отправить код на текущий email",

        step2_success: "Текущий email подтверждён",
        step2_error: "Неверный код для текущего email",

        step3_success: "Код отправлен на новый email",
        step3_error: "Не удалось отправить код на новый email",

        step4_success: "Новый email подтверждён",
        step4_error: "Неверный код для нового email",

        step5_success: "Email успешно изменён",
        step5_error: "Не удалось завершить смену email"
    },
    settingsPage: {
        title: "Настройки",
        account: "Аккаунт",
        contacts: "Контакты",
        security: "Безопасность",
        payments: "Платежи",
        subscriptions: "Подписки",
        profileInfo: "Информация профиля",
        contactInfo: "Контактная информация",
        devicesAndActivity: "Устройства и активность",
        phone: "Телефон",
        edit: "Изменить",
        twoFactorAuth: "Двухфакторная аутентификация",
        deleteAccount: "Удаление аккаунта",
        changePassword: "Изменить пароль",
        createPassword: "Создать пароль",
        externalAuthMethods: "Внешние сервисы входа",
        
        toastGoogleAccountConnectedSuccessfully: "Google аккаунт подключен успешно!",
        toastGoogleAccountConnectedToOtherUser: "Данный Google аккаунт подключен к другому пользователю",

        toastAppleAccountConnectedSuccessfully: "Apple аккаунт подключен успешно!",
        toastAppleAccountConnectedToOtherUser: "Данный Apple аккаунт подключен к другому пользователю",

        toastUnkownError: "Возникла неизвестная ошибка"
    },
    restoreAccountPage: {
        title: "Восстановление аккаунта",
        description: "Вы можете восстановить свой аккаунт или удалить его полностью.",
        restoreButton: "Восстановить аккаунт",
        restoreLoading: "Восстанавливаем...",
        restoreSuccess: "Аккаунт успешно восстановлен",
        restoreError: "Не удалось восстановить аккаунт",

        deleteButton: "Удалить аккаунт навсегда",
        deleteConfirmTitle: "Подтвердите удаление",
        deleteConfirmDescription: "Вы уверены, что хотите удалить аккаунт? Это действие невозможно отменить.",
        deleteConfirmButton: "Удалить аккаунт",
        deleteLoading: "Удаляем...",
        deleteSuccess: "Аккаунт успешно удалён",
        deleteError: "Не удалось удалить аккаунт",
        cancel: "Отмена"
    },
    twoFactorAuthPage: {
      title: "Двухфакторная аутентификация",
      description: "Введите код подтверждения, отправленный на вашу почту",
      formLabel: "Код подтверждения",
      button: "Отправить",
      buttonLoading: "Отправка",
      emptyCodeError: "Пожалуйста, введите код подтверждения.",
      successMessage: "Подтверждение прошло успешно!",
      invalidCodeMessage: "Неверный код подтверждения.",
      genericError: "Что-то пошло не так. Попробуйте еще раз."
    }
}as const