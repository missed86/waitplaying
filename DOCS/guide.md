
## Types -> Django

```

INT = models.IntegerField()

FLOAT = models.FloatField()

ARRAY_OF_IDS = models.ManyToManyField('self', related_name='tabla_ejemplo', symmetrical=False)

ENUM = models.IntegerField(max_length=20, choices=[(tag.value, tag.name) for tag in EjemploEnum])

LONGTEXT = models.TextField()

STRING = models.CharField(max_length=255)

FOREIGN_KEY = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='tabla_ejemplo')

```