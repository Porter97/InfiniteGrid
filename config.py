import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret') # Change in a production app
    UNSPLASH_CLIENT_ID = os.environ.get('UNSPLASH_CLIENT_ID')
    RESULTS_PER_PAGE = 30

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    pass


class TestingConfig(Config):
    pass


class ProductionConfig(Config):
    pass


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}