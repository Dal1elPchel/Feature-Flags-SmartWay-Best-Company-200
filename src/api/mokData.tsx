import {FeatureFlag} from "../types/featureFlag.ts";
import {User} from "../types/user.ts";

export const mockFlags: FeatureFlag[] = [
    {
        id: "1",
        name: "new_checkout",
        description: "Новый процесс оформления заказа",
        environment: "development",
        status: "enabled",
        owner: "Frontend Team",
        createdBy: "Алексей Кузнецов",
        createdAt: "2026-06-10T09:15:00Z",
        updatedBy: "Алексей Кузнецов",
        updatedAt: "2026-06-28T15:04:05Z"
    },
    {
        id: "2",
        name: "promo_banner",
        description: "Промо-баннер на главной странице",
        environment: "staging",
        status: "disabled",
        owner: "Marketing Team",
        createdBy: "Мария Иванова",
        createdAt: "2026-06-08T12:00:00Z",
        updatedBy: "Мария Иванова",
        updatedAt: "2026-06-27T13:25:00Z"
    },
    {
        id: "3",
        name: "dark_theme",
        description: "Темная тема интерфейса",
        environment: "production",
        status: "enabled",
        owner: "Frontend Team",
        createdBy: "Дмитрий Волков",
        createdAt: "2026-06-01T08:30:00Z",
        updatedBy: "Дмитрий Волков",
        updatedAt: "2026-06-26T09:11:00Z"
    },
    {
        id: "4",
        name: "smart_search",
        description: "Новый алгоритм поиска",
        environment: "development",
        status: "enabled",
        owner: "Core Team",
        createdBy: "Иван Смирнов",
        createdAt: "2026-05-29T10:20:00Z",
        updatedBy: "Иван Смирнов",
        updatedAt: "2026-06-25T17:10:00Z"
    },
    {
        id: "5",
        name: "report_export",
        description: "Экспорт отчетов в Excel и PDF",
        environment: "production",
        status: "disabled",
        owner: "Backend Team",
        createdBy: "Мария Иванова",
        createdAt: "2026-05-25T14:50:00Z",
        updatedBy: "Мария Иванова",
        updatedAt: "2026-06-24T10:45:00Z"
    },
    {
        id: "6",
        name: "mobile_header",
        description: "Новый мобильный хедер",
        environment: "staging",
        status: "enabled",
        owner: "Frontend Team",
        createdBy: "Дмитрий Волков",
        createdAt: "2026-05-22T11:00:00Z",
        updatedBy: "Дмитрий Волков",
        updatedAt: "2026-06-23T12:30:00Z"
    },
    {
        id: "7",
        name: "beta_profile",
        description: "Бета-профиль пользователя",
        environment: "production",
        status: "enabled",
        owner: "Core Team",
        createdBy: "Анна Петрова",
        createdAt: "2026-05-20T09:00:00Z",
        updatedBy: "Анна Петрова",
        updatedAt: "2026-06-22T18:00:00Z"
    },
    {
        id: "8",
        name: "recommendations",
        description: "Персональные рекомендации",
        environment: "development",
        status: "disabled",
        owner: "ML Team",
        createdBy: "Егор Николаев",
        createdAt: "2026-05-18T13:45:00Z",
        updatedBy: "Егор Николаев",
        updatedAt: "2026-06-21T11:05:00Z"
    },
    {
        id: "9",
        name: "chat_support",
        description: "Онлайн-чат поддержки",
        environment: "staging",
        status: "enabled",
        owner: "Support Team",
        createdBy: "Олег Васильев",
        createdAt: "2026-05-15T10:30:00Z",
        updatedBy: "Олег Васильев",
        updatedAt: "2026-06-20T16:15:00Z"
    },
    {
        id: "10",
        name: "wishlist",
        description: "Избранные товары",
        environment: "production",
        status: "enabled",
        owner: "Product Team",
        createdBy: "Анна Петрова",
        createdAt: "2026-05-12T08:40:00Z",
        updatedBy: "Анна Петрова",
        updatedAt: "2026-06-19T09:50:00Z"
    },
    {
        id: "11",
        name: "auto_save",
        description: "Автоматическое сохранение",
        environment: "development",
        status: "disabled",
        owner: "Platform Team",
        createdBy: "Иван Смирнов",
        createdAt: "2026-05-10T15:15:00Z",
        updatedBy: "Иван Смирнов",
        updatedAt: "2026-06-18T14:00:00Z"
    },
    {
        id: "12",
        name: "notifications_v2",
        description: "Новый центр уведомлений",
        environment: "staging",
        status: "enabled",
        owner: "Frontend Team",
        createdBy: "Алексей Кузнецов",
        createdAt: "2026-05-08T09:20:00Z",
        updatedBy: "Алексей Кузнецов",
        updatedAt: "2026-06-17T13:15:00Z"
    },
    {
        id: "13",
        name: "fast_login",
        description: "Быстрая авторизация",
        environment: "production",
        status: "enabled",
        owner: "Security Team",
        createdBy: "Виктор Орлов",
        createdAt: "2026-05-05T10:00:00Z",
        updatedBy: "Виктор Орлов",
        updatedAt: "2026-06-16T08:45:00Z"
    },
    {
        id: "14",
        name: "payment_v2",
        description: "Новая система оплаты",
        environment: "production",
        status: "disabled",
        owner: "Payments Team",
        createdBy: "Мария Иванова",
        createdAt: "2026-05-03T12:30:00Z",
        updatedBy: "Мария Иванова",
        updatedAt: "2026-06-15T17:20:00Z"
    },
    {
        id: "15",
        name: "analytics_dashboard",
        description: "Новая аналитическая панель",
        environment: "staging",
        status: "enabled",
        owner: "Analytics Team",
        createdBy: "Егор Николаев",
        createdAt: "2026-05-01T11:10:00Z",
        updatedBy: "Егор Николаев",
        updatedAt: "2026-06-14T09:40:00Z"
    },
    {
        id: "16",
        name: "multi_language",
        description: "Поддержка нескольких языков",
        environment: "development",
        status: "enabled",
        owner: "Localization Team",
        createdBy: "Олег Васильев",
        createdAt: "2026-04-29T14:00:00Z",
        updatedBy: "Олег Васильев",
        updatedAt: "2026-06-13T15:10:00Z"
    },
    {
        id: "17",
        name: "ab_testing",
        description: "A/B тестирование новых функций",
        environment: "production",
        status: "disabled",
        owner: "Product Team",
        createdBy: "Анна Петрова",
        createdAt: "2026-04-25T09:35:00Z",
        updatedBy: "Анна Петрова",
        updatedAt: "2026-06-12T10:55:00Z"
    }
];

export const createdFlag = {
    id: "18"
}

export const ttoken = "fgwejgoibwrnb"

export const authUser: User = {
    id: "42",
    name: "Даниил",
    email: "danielpchelincev987@mail.ru",
    surname: "Пчелинцев"
};