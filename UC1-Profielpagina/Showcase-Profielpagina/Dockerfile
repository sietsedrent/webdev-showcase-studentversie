# Gebruik een officiële .NET SDK om de applicatie te bouwen
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Kopieer en restore afhankelijkheden
COPY *.csproj ./
RUN dotnet restore

# Kopieer de rest van de code en bouw de applicatie
COPY . ./
RUN dotnet publish -c Release -o out

# Gebruik een lichte runtime image om de app te draaien
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expose poort 5000 voor toegang
EXPOSE 5000

# Start de applicatie
ENTRYPOINT ["dotnet", "Showcase-Profielpagina.dll"]
